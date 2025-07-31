import requests
page_url = 'https://www.melon.com/chart/age/list.htm'

params = {
    'idx': '1', 
    'chartType' : 'YE',
    'chartGenre' : 'KPOP',
    'chartDate' : '2019',
    'moved' : 'Y',
}

headers ={
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
}   

res = requests.get(page_url, params=params, headers=headers)
print(res) # 상태코드 출력

html: str = res.text
with open('melon_chart.html', 'wt', encoding='utf-8') as f:
    f.write(html)
    print('written to', f.name)

# --- BeautifulSoup로 melon_chart.html 파싱하여 JSON 저장 ---
import json
from bs4 import BeautifulSoup

def parse_melon_chart(html_path, json_path):
    with open(html_path, 'rt', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')

    result = []
    for tr in soup.select('tr.lst50, tr.lst100'):
        # 순위
        rank_tag = tr.select_one('span.rank')
        rank = int(rank_tag.text.strip()) if rank_tag and rank_tag.text.strip().isdigit() else None

        # 곡명 및 곡ID
        song_a = tr.select_one('a.btn.btn_icon_detail')
        if song_a:
            song_name = song_a['title'].replace(' 곡정보 보기', '').strip()
            # 곡ID 추출 (onclick="melon.link.goSongDetail('31324607');")
            import re
            m = re.search(r"goSongDetail\('([0-9]+)'\)", song_a.get('onclick', ''))
            song_id = m.group(1) if m else ''
        else:
            song_name = ''
            song_id = ''

        # 앨범명 및 앨범ID
        album_img = tr.select_one('img[alt$="앨범 이미지"]')
        if album_img:
            album_name = album_img['alt'].replace(' 앨범 이미지', '').strip()
        else:
            album_name = ''
        album_span = tr.select_one('span.bg_album_frame')
        if album_span:
            m = re.search(r"goAlbumDetail\('([0-9]+)'\)", album_span.get('onclick', ''))
            album_id = m.group(1) if m else ''
        else:
            album_id = ''

        # 가수명 (wrap_song_info > ellipsis.rank02 > span)
        artist = ''
        song_info = tr.select_one('div.wrap_song_info')
        if song_info:
            artist_tag = song_info.select_one('div.ellipsis.rank02 span')
            if artist_tag and artist_tag.text.strip():
                artist = artist_tag.text.strip()

        # 좋아요 수
        like_btn = tr.select_one('button.btn_icon.like span.cnt')
        if like_btn:
            import re
            m = re.search(r'([0-9,]+)', like_btn.text)
            like_count = int(m.group(1).replace(',', '')) if m else 0
        else:
            like_count = 0

        result.append({
            'rank': rank,
            'song_id': song_id,
            'song_name': song_name,
            'artist': artist,
            'album_id': album_id,
            'album_name': album_name,
            'like_count': like_count
        })

    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(result, f, ensure_ascii=False, indent=4)
    print(f'written to {json_path}')

if __name__ == '__main__':
    # melon_chart.html -> melon_kpop_2019.json
    parse_melon_chart('melon_chart.html', 'melon_kpop_2019.json')
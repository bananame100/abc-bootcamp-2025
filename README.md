# ABC 데이터 부트캠프 2025 실습 코드

## 개요
이 프로젝트는 ABC 데이터 부트캠프 2025의 실습 예제 코드 모음입니다.  
파이썬과 다양한 라이브러리를 활용하여 데이터 분석, 웹앱, 오디오 처리, OpenAI API 연동 등 실습을 진행합니다.

## 환경

- Python 3.13 (Anaconda 배포판 권장)
- 주요 라이브러리: openai, streamlit, gtts, pygame 등
- 환경 변수: `.env` 파일에 API 키 등 설정

## 폴더/파일 설명

- `01-cli.py` : OpenAI API를 이용한 기본 텍스트 생성 CLI 예제
- `02-cli.py` : 사용자 입력을 받아 OpenAI로 질문/답변하는 CLI 챗봇
- `03-cli.py` : 멜론 TOP100 데이터를 활용한 음악 추천 챗봇
- `04-webapp.py` : Streamlit 기반 관상 분석 웹앱
- `05-cli-streaming.py` : OpenAI API의 스트리밍 응답 처리 예제
- `06-cli-chat.py` : 영어 상황극 챗봇 CLI 예제
- `07-json.py` : 멜론 TOP100 JSON 데이터 파싱 및 분석
- `08-webapp-melon-top100.py` : 멜론 TOP100 데이터를 시각화하는 웹앱
- `09-melon-search.py` : 멜론 검색 API를 활용한 음악 검색 예제
- `ai.py` : OpenAI 기반 관상 분석 함수 모음
- `audio.py` : gTTS와 pygame을 활용한 음성 합성 및 재생 함수
- `generator_01.py` : 파이썬 제너레이터 활용 예제
- `requirements.txt` : 프로젝트 필수 라이브러리 목록
- `html/01-melon-top100.html` : 멜론 TOP100 검색 결과 샘플 HTML
- `.env` : 환경변수 파일 (API 키 등)
- `.gitignore` : Git 관리 제외 파일 목록

## 설치 방법

```sh
conda create -n bootcamp python=3.13
conda activate bootcamp
pip install -r requirements.txt
```

## 실행 예시

- CLI 예제:
  ```sh
  python 02-cli.py
  ```
- 웹앱 예제:
  ```sh
  streamlit run 04-webapp.py
  ```

## 참고

- 실습용 코드로, 상업적 사용은 권장하지 않습니다.
- 멜론 API 사용 시 서비스 정책을 준수하세요.
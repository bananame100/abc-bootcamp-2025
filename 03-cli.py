from dotenv import load_dotenv
from ai import get_personality_analysis

load_dotenv()

print("# AI 관상가입니다. 얼굴 특징을 입력해주시면 성격과 미래를 알려드릴게요.")
line = input("얼굴 특징 : ").strip()


if not line:
    # 입력하지 않을 시
    print("입력해야 알려주죠")
else:
    print("입력하신 얼굴 특징 : ",line)
    print("분석 중...")
    result=get_personality_analysis(line)
    print("분석 완료!")
    print(result)

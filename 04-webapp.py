from dotenv import load_dotenv
import streamlit as st
from ai import get_personality_analysis

load_dotenv()

st.title("🔮야매 관상가🔮")
st.write("---")

st.write("🫅왕이 될 상인지 분석")

face_desc = st.text_area("얼굴 특징 입력")
face_desc = face_desc.strip()

if st.button("관상 보기", type="primary"):
    if face_desc:
        with st.spinner("관상 분석 중"):
            result=get_personality_analysis(face_desc)
            st.write("----")
            st.write("관상 분석 완료")
            st.info(result)
    else:
        st.error("얼굴을 알려줘야 관상을 봐주죠.")
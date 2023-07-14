<h1>Camp ing</h1><br>
내일배움캠프 6기 2조 개인과제 23.07.09 - 23.07.14<br>
<br>
<br>

1. 프로젝트 소개<br>
회원가입과 로그인을 하고 캠핑,글램핑에 대한 리뷰를 나눌수 있는 웹사이트입니다.
<br>

2. 구현 기능
- UI 구현하기
- Post 추가 하기
- Post 수정 하기
- Post 삭제 하기
- 회원가입 및 로그인
<br>

3. 프로젝트 주소
https://camp-ht2f1k02u-kimseulgi-creator.vercel.app/?vercelToolbarCode=uatKulZ3FkAPLzw
<br>

4. 기술스택

  <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/>
	<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" />
	<img src="https://img.shields.io/badge/Styledcomponents-DB7093?style=flat&logo=Styledcomponents&logoColor=white" />
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=Firebase&logoColor=white" />
<br>

5. API Table

| Number | Method | URL                                   | Description     | Request                                                      | Response                                                     |
| ------ | ------ | ------------------------------------- | --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1      | `POST` | /api/home                             | 로그인          | {'id' : id, 'isLogin' : true}                                       | { 'id' : id, 'user' : userId, 'pasword' : password  }                                                      |
| 2      | `POST` | /api/join                          | 회원가입        | {'user' : userId, 'password' : password}                            | {'user' : userId}                                                            |
| 3      | `POST` | /api/write                          | 게시글 등록       | { 'Id':게시글id, 'user': 작성자, 'image': imageUrl, 'postDate':게시글 작성날짜, firstday' : 캠핑 첫 날, 'lastday' : 캠핑 마지막 날, 'place' : 캠핑 장소, 'review': 캠핑 내용 }                  |  {'user' : userId}                                                             |
| 4      | `POST` | /api/editdetail                             | 게시글 수정          | { 'Id':게시글id, 'user': 작성자, 'image': imageUrl, 'postDate':게시글 작성날짜, firstday' : 캠핑 첫 날, 'lastday' : 캠핑 마지막 날, 'place' : 캠핑 장소, 'review': 캠핑 내용 }                                          |                                                              |
| 5      | `GET` | /api/list                         | 게시글 리스트   |                               |  {'image': imageUrl, 'place' : 캠핑 장소, 'postDate':게시글 작성날짜 }                                                            |
| 6      | `GET` | /api/detail                          | 게시글 상세보기     |  |  {'Id':게시글id, 'user' : userId, 'image': imageUrl, firstday' : 캠핑 첫 날, 'lastday' : 캠핑 마지막 날, 'place' : 캠핑 장소, 'review': 캠핑 내용 }                                                           |
<br>

6. 컴포넌트 소개
- Layout<br>
  header와 최대 넓이 1300px 지정해주는 inner class가 묶여 있는 컴포넌트입니다.
  
- Button<br>
모든 스타일과 기능을 구현할 수 있는 버튼
<br>

7. 프로젝트 시연 영상<br>
<br>

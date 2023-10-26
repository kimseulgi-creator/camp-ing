# Camp ing
![camping](https://github.com/kimseulgi-creator/camp-ing/assets/78592995/a0aa4a4d-2bc4-4b36-9b1a-4b5225d9db8b)

내일배움캠프 6기 2조 개인과제 23.07.09 - 23.07.14
<br>

## 목차

1. [프로젝트 소개](#프로젝트-소개)
2. [구현기능 및 기술스택](#구현기능)
3. [배포주소/Figma주소](#배포주소/Figma주소)
4. [API Table](#api-table)
5. [컴포넌트 소개](#컴포넌트-소개)
6. [프로젝트 시연 영상](#프로젝트-시연-영상)
<br>

## 프로젝트 소개
*캠핑은 ing, 여전히 진행중⛺*

베테랑 캠핑러부터 초보 캠핑러까지 모두 모여 소통하자!<br>
캠핑 꿀팁부터 장비, 다양한 자연환경 속 캠핑 장소 추천까지!<br>
회원가입과 로그인을 하고 캠핑, 글램핑에 대한 리뷰를 나눌 수 있는 플랫폼 서비스입니다.


<br>

## 구현기능
- 회원가입 및 로그인
- 캠핑리뷰 CRUD 구현
- UI 구현하기

<br>

## 기술스택
<div>
	<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=HTML5&logoColor=white" />
	<img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/>
	<img src="https://img.shields.io/badge/redux-764ABC?style=flat&logo=redux&logoColor=white"/>
	<img src="https://img.shields.io/badge/axios-5A29E4?style=flat&logo=axios&logoColor=white" />
	<img src="https://img.shields.io/badge/reactquery-FF4154?style=flat&logo=reactquery&logoColor=white" />
	<img src="https://img.shields.io/badge/Styledcomponents-DB7093?style=flat&logo=Styledcomponents&logoColor=white" />
	<img src="https://img.shields.io/badge/json server-000000?style=flat&logo=json&logoColor=white" />
	<img src="https://img.shields.io/badge/Firestore-FFCA28?style=flat&logo=Firebase&logoColor=white" />
</div>

<br>

## 배포주소/Figma주소
[배포주소](https://camp-ht2f1k02u-kimseulgi-creator.vercel.app/?vercelToolbarCode=uatKulZ3FkAPLzw)<br />
[Figma주소](https://www.figma.com/file/g0yz68oNgKkzungmZA7bGk/camp_ing?type=design&node-id=0%3A1&mode=design&t=piCdf21RQlamg7ds-1)

<br>

## API Table

| Number | Method | URL                                   | Description     | Request                                                      | Response                                                     |
| ------ | ------ | ------------------------------------- | --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 1      | `POST` | /api/home                             | 로그인          | {'id' : id, 'isLogin' : true}                                       | { 'id' : id, 'user' : userId, 'pasword' : password  }                                                      |
| 2      | `POST` | /api/join                          | 회원가입        | {'user' : userId, 'password' : password}                            | {'user' : userId}                                                            |
| 3      | `POST` | /api/write                          | 게시글 등록       | { 'Id':게시글id, 'user': 작성자, 'image': imageUrl, 'postDate':게시글 작성날짜, firstday' : 캠핑 첫 날, 'lastday' : 캠핑 마지막 날, 'place' : 캠핑 장소, 'review': 캠핑 내용 }                  |  {'user' : userId}                                                             |
| 4      | `POST` | /api/editdetail                             | 게시글 수정          | { 'Id':게시글id, 'user': 작성자, 'image': imageUrl, 'postDate':게시글 작성날짜, firstday' : 캠핑 첫 날, 'lastday' : 캠핑 마지막 날, 'place' : 캠핑 장소, 'review': 캠핑 내용 }                                          |                                                              |
| 5      | `GET` | /api/list                         | 게시글 리스트   |                               |  {'image': imageUrl, 'place' : 캠핑 장소, 'postDate':게시글 작성날짜 }                                                            |
| 6      | `GET` | /api/detail                          | 게시글 상세보기     |  |  {'Id':게시글id, 'user' : userId, 'image': imageUrl, firstday' : 캠핑 첫 날, 'lastday' : 캠핑 마지막 날, 'place' : 캠핑 장소, 'review': 캠핑 내용 }                                                           |
<br>

## 컴포넌트 소개
- Layout<br>
  header와 최대 넓이 1300px 지정해주는 inner class가 묶여 있는 컴포넌트입니다.
  
- Button<br>
모든 스타일과 기능을 구현할 수 있는 버튼

<br>

## 프로젝트 시연 영상<br>
![KakaoTalk_20231026_182027157](https://github.com/kimseulgi-creator/camp-ing/assets/78592995/fb7b150c-11fc-4fa5-babc-2fd198e9d05a)
![KakaoTalk_20231026_182027157_01](https://github.com/kimseulgi-creator/camp-ing/assets/78592995/77cfb794-d3f9-4028-9d3a-90fc1090bce5)

<br>

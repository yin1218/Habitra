# 相關資訊
- Demo影片連結：https://drive.google.com/drive/folders/1DjKDuPkl-mrxqXiaisGsLMKVQ0CbliH3?usp=sharing
- Deploy連結：[https://habitra.netlify.app/](https://habitra.netlify.app/)

# 主題描述：
想必大家經常都會遇到想要養成每天運動的習慣 或是 想要一週固定幾天去圖書館複習，但往往會因為偷懶或是沒有動力而嘗試幾次就放棄，因此我們製作了 習慣養成社群 Habitra，我們希望透過以任務為導向的群組來互相督促，開啟新任務群組的管理員可以設定每天打卡次數、一週的休息日、和沒達到標準會有多少金額的懲罰累積，我們會在後端做運算後於前端畫面顯示，並設置了任務群組錢包，顯示各成員累積的懲罰金額，群組成員可以在相約吃飯時依顯示金額請客吃飯，並於系統中清空錢包。希望透過夥伴的力量，可以一起養成良好的習慣！

# 使用與參考之套件/框架/原始碼
- frontend
    - React.js, react-router-dom, axios, ant-design
- backend
    - Node.js, MongoDB
- deployment
    - Heroku

## 如何在 localhost 安裝與測試之詳細步驟
- 在根目錄、/backend、/frontend 分別 yarn install
- 複製一份 .env.defaults 來建立 .env 檔（.env.defaults 在 backend 資料夾底下），並填入個人的 MONGO_URL 
- 在根目錄 yarn server 開啟後端
- 在根目錄 yarn start 開啟前端
- 

## 每位成員負責項目
- 巫芊瑩
    - 前端和 wireframe 設計
- 陳沛妤
    - 串接和 api 文件撰寫
- 陳冠伊
    - 後端和 database schema 設計和部屬網站

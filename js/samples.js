// Compomint 샘플 코드 관리
class CompomintSamples {
    constructor() {
        this.samples = {
            basic: [],
            components: [],
            advanced: [],
            realworld: []
        };
        this.initializeSamples();
    }

    initializeSamples() {
        this.defineBasicSamples();
        this.defineComponentSamples();
        this.defineAdvancedSamples();
        this.defineRealworldSamples();
    }

    // 기본 사용법 샘플들
    defineBasicSamples() {
        this.samples.basic = [
            {
                title: 'Hello World',
                description: 'Compomint의 가장 기본적인 사용법입니다. 템플릿을 정의하고 컴포넌트를 생성하는 방법을 배워보세요.',
                template: `<template id="hello-world">
  <style id="style-hello-world">
    .hello-world {
      padding: 20px;
      text-align: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
    }
    .hello-world h1 {
      margin: 0;
      font-size: 2rem;
    }
    .hello-world p {
      margin: 10px 0 0 0;
      opacity: 0.9;
    }
  </style>
  <div class="hello-world">
    <h1>##=data.title##</h1>
    <p>##=data.message##</p>
  </div>
</template>`,
                code: `// 컴포넌트 생성
const helloComponent = tmpl.HelloWorld({
  title: 'Hello Compomint!',
  message: '템플릿 기반 컴포넌트 프레임워크입니다.'
});

// DOM에 추가
document.body.appendChild(helloComponent.element);`
            },
            
            {
                title: '데이터 바인딩',
                description: '다양한 데이터 타입의 바인딩과 표현식 사용법을 학습합니다.',
                template: `<template id="data-binding">
  <style id="style-data-binding">
    .data-binding {
      padding: 20px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      font-family: 'Segoe UI', Tahoma, Arial, sans-serif;
    }
    .data-item {
      margin: 10px 0;
      padding: 8px;
      background: #f8fafc;
      border-radius: 4px;
    }
    .data-label {
      font-weight: bold;
      color: #4a5568;
    }
  </style>
  ##
  // JavaScript 코드 블록
  const currentDate = new Date().toLocaleDateString('ko-KR');
  const isEven = data.number % 2 === 0;
  ##
  <div class="data-binding">
    <h3>데이터 바인딩 예제</h3>
    <div class="data-item">
      <span class="data-label">문자열:</span> ##=data.name##
    </div>
    <div class="data-item">
      <span class="data-label">숫자:</span> ##=data.number## (##=isEven ? '짝수' : '홀수'##)
    </div>
    <div class="data-item">
      <span class="data-label">배열:</span> ##=data.items.join(', ')##
    </div>
    <div class="data-item">
      <span class="data-label">객체:</span> ##=data.user.name## (##=data.user.age##세)
    </div>
    <div class="data-item">
      <span class="data-label">날짜:</span> ##=currentDate##
    </div>
    <div class="data-item">
      <span class="data-label">조건부:</span> ##=data.isVisible ? '보임' : '숨김'##
    </div>
  </div>
</template>`,
                code: `// 다양한 데이터 타입으로 컴포넌트 생성
const dataComponent = tmpl.DataBinding({
  name: 'Compomint 프레임워크',
  number: 42,
  items: ['템플릿', '컴포넌트', '데이터바인딩'],
  user: {
    name: '김개발',
    age: 30
  },
  isVisible: true
});

document.body.appendChild(dataComponent.element);`
            },

            {
                title: '이벤트 처리',
                description: 'HTML 요소에 이벤트를 바인딩하고 처리하는 방법을 배웁니다.',
                template: `<template id="event-handling">
  <style id="style-event-handling">
    .event-handling {
      padding: 20px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
    }
    .counter-display {
      font-size: 2rem;
      text-align: center;
      margin: 20px 0;
      color: #667eea;
      font-weight: bold;
    }
    .button-group {
      display: flex;
      gap: 10px;
      justify-content: center;
    }
    .btn {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      transition: all 0.3s ease;
    }
    .btn-primary {
      background: #667eea;
      color: white;
    }
    .btn-primary:hover {
      background: #5a67d8;
      transform: translateY(-2px);
    }
    .btn-secondary {
      background: #e2e8f0;
      color: #4a5568;
    }
    .btn-secondary:hover {
      background: #cbd5e0;
    }
  </style>
  ##
  // 상태 관리
  status.count = status.count || data.initialCount || 0;
  
  // 이벤트 핸들러 함수들
  function increment() {
    status.count++;
    component.refresh();
  }
  
  function decrement() {
    status.count--;
    component.refresh();
  }
  
  function reset() {
    status.count = 0;
    component.refresh();
  }
  ##
  <div class="event-handling">
    <h3>이벤트 처리 예제</h3>
    <div class="counter-display">##=status.count##</div>
    <div class="button-group">
      <button class="btn btn-primary" data-co-event="##:{click: increment}##">
        증가 (+1)
      </button>
      <button class="btn btn-primary" data-co-event="##:{click: decrement}##">
        감소 (-1)
      </button>
      <button class="btn btn-secondary" data-co-event="##:{click: reset}##">
        리셋
      </button>
    </div>
  </div>
</template>`,
                code: `// 카운터 컴포넌트 생성
const counterComponent = tmpl.EventHandling({
  initialCount: 10
});

document.body.appendChild(counterComponent.element);

// 외부에서 상태에 접근하기
console.log('현재 카운트:', counterComponent.status?.count);`
            }
        ];
    }

    // 컴포넌트 샘플들
    defineComponentSamples() {
        this.samples.components = [
            {
                title: '재사용 가능한 컴포넌트',
                description: '여러 번 사용할 수 있는 컴포넌트를 만들고 조합하는 방법을 배웁니다.',
                template: `<template id="user-card">
  <style id="style-user-card">
    .user-card {
      display: flex;
      align-items: center;
      padding: 16px;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      background: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      margin: 10px 0;
      transition: transform 0.2s ease;
    }
    .user-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
    }
    .user-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 18px;
      margin-right: 16px;
    }
    .user-info h4 {
      margin: 0 0 4px 0;
      color: #2d3748;
      font-size: 16px;
    }
    .user-info p {
      margin: 0;
      color: #718096;
      font-size: 14px;
    }
    .user-status {
      margin-left: auto;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: bold;
    }
    .status-online {
      background: #c6f6d5;
      color: #2f855a;
    }
    .status-offline {
      background: #fed7d7;
      color: #c53030;
    }
  </style>
  ##
  const firstLetter = data.name.charAt(0).toUpperCase();
  const statusClass = data.isOnline ? 'status-online' : 'status-offline';
  const statusText = data.isOnline ? '온라인' : '오프라인';
  ##
  <div class="user-card">
    <div class="user-avatar">##=firstLetter##</div>
    <div class="user-info">
      <h4>##=data.name##</h4>
      <p>##=data.email##</p>
    </div>
    <span class="user-status ##=statusClass##">##=statusText##</span>
  </div>
</template>

<template id="user-list">
  <style id="style-user-list">
    .user-list {
      max-width: 500px;
      margin: 0 auto;
    }
    .user-list h3 {
      text-align: center;
      color: #2d3748;
      margin-bottom: 20px;
    }
  </style>
  ##
  const userComponents = data.users.map(user => 
    tmpl.UserCard(user)
  );
  ##
  <div class="user-list">
    <h3>사용자 목록</h3>
    ##%userComponents##
  </div>
</template>`,
                code: `// 사용자 데이터
const users = [
  {
    name: '김철수',
    email: 'kim@example.com',
    isOnline: true
  },
  {
    name: '이영희',
    email: 'lee@example.com',
    isOnline: false
  },
  {
    name: '박민수',
    email: 'park@example.com',
    isOnline: true
  }
];

// 사용자 목록 컴포넌트 생성
const userList = tmpl.UserList({ users });
document.body.appendChild(userList.element);

// 개별 사용자 카드도 생성 가능
const singleUser = tmpl.UserCard({
  name: '최개발',
  email: 'dev@compomint.dev',
  isOnline: true
});
document.body.appendChild(singleUser.element);`
            },

            {
                title: '동적 컴포넌트',
                description: '런타임에 동적으로 컴포넌트를 추가하고 제거하는 방법을 학습합니다.',
                template: `<template id="todo-app">
  <style id="style-todo-app">
    .todo-app {
      max-width: 500px;
      margin: 0 auto;
      padding: 20px;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      background: white;
    }
    .todo-header {
      text-align: center;
      margin-bottom: 20px;
    }
    .todo-input-group {
      display: flex;
      gap: 10px;
      margin-bottom: 20px;
    }
    .todo-input {
      flex: 1;
      padding: 12px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      font-size: 14px;
    }
    .todo-input:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
    .btn-add {
      padding: 12px 20px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
    }
    .btn-add:hover {
      background: #5a67d8;
    }
    .todo-list {
      min-height: 200px;
    }
    .todo-stats {
      margin-top: 20px;
      text-align: center;
      color: #718096;
      font-size: 14px;
    }
  </style>
  ##
  // 상태 초기화
  status.todos = status.todos || [];
  status.nextId = status.nextId || 1;
  
  // 할 일 추가 함수
  function addTodo() {
    const input = component.element.querySelector('.todo-input');
    const text = input.value.trim();
    
    if (text) {
      status.todos.push({
        id: status.nextId++,
        text: text,
        completed: false
      });
      input.value = '';
      refreshTodoList();
    }
  }
  
  // 할 일 삭제 함수
  function removeTodo(id) {
    status.todos = status.todos.filter(todo => todo.id !== id);
    refreshTodoList();
  }
  
  // 할 일 완료 토글 함수
  function toggleTodo(id) {
    const todo = status.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      refreshTodoList();
    }
  }
  
  // 할 일 목록 새로고침
  function refreshTodoList() {
    const todoList = component.element.querySelector('.todo-list');
    todoList.innerHTML = '';
    
    status.todos.forEach(todo => {
      const todoItem = tmpl.TodoItem({
        ...todo,
        onToggle: () => toggleTodo(todo.id),
        onRemove: () => removeTodo(todo.id)
      });
      todoList.appendChild(todoItem.element);
    });
    
    // 통계 업데이트
    const stats = component.element.querySelector('.todo-stats');
    const total = status.todos.length;
    const completed = status.todos.filter(t => t.completed).length;
    stats.textContent = \`총 \${total}개, 완료 \${completed}개\`;
  }
  
  // Enter 키 처리
  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      addTodo();
    }
  }
  ##
  <div class="todo-app">
    <div class="todo-header">
      <h3>할 일 관리</h3>
    </div>
    <div class="todo-input-group">
      <input type="text" class="todo-input" placeholder="새로운 할 일을 입력하세요..." 
             data-co-event="##:{keypress: handleKeyPress}##">
      <button class="btn-add" data-co-event="##:{click: addTodo}##">추가</button>
    </div>
    <div class="todo-list"></div>
    <div class="todo-stats">총 0개, 완료 0개</div>
  </div>
  ###
  // 초기 렌더링
  refreshTodoList();
  ##
</template>

<template id="todo-item">
  <style id="style-todo-item">
    .todo-item {
      display: flex;
      align-items: center;
      padding: 12px;
      border: 1px solid #e2e8f0;
      border-radius: 6px;
      margin-bottom: 8px;
      background: white;
      transition: all 0.2s ease;
    }
    .todo-item.completed {
      background: #f7fafc;
      opacity: 0.7;
    }
    .todo-checkbox {
      margin-right: 12px;
    }
    .todo-text {
      flex: 1;
      font-size: 14px;
      color: #2d3748;
    }
    .todo-text.completed {
      text-decoration: line-through;
      color: #a0aec0;
    }
    .btn-remove {
      padding: 6px 12px;
      background: #fed7d7;
      color: #c53030;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
    }
    .btn-remove:hover {
      background: #feb2b2;
    }
  </style>
  <div class="todo-item ##=data.completed ? 'completed' : ''##">
    <input type="checkbox" class="todo-checkbox" ##=data.completed ? 'checked' : ''##
           data-co-event="##:{change: data.onToggle}##">
    <span class="todo-text ##=data.completed ? 'completed' : ''##">##=data.text##</span>
    <button class="btn-remove" data-co-event="##:{click: data.onRemove}##">삭제</button>
  </div>
</template>`,
                code: `// 할 일 앱 생성
const todoApp = tmpl.TodoApp({});
document.body.appendChild(todoApp.element);

// 프로그래밍 방식으로 할 일 추가
setTimeout(() => {
  // 앱의 상태에 직접 접근하여 할 일 추가
  todoApp.status.todos.push({
    id: todoApp.status.nextId++,
    text: 'Compomint 학습하기',
    completed: false
  });
  
  // 할 일 목록 새로고침 (컴포넌트 내부 함수 호출)
  const refreshFunction = new Function(
    'status', 'component', 'tmpl',
    todoApp.element.querySelector('.todo-app').dataset.refreshCode
  );
  // 실제로는 component.refresh() 또는 내부 메서드를 사용합니다.
}, 1000);`
            }
        ];
    }

    // 고급 기능 샘플들
    defineAdvancedSamples() {
        this.samples.advanced = [
            {
                title: '국제화 (i18n)',
                description: 'Compomint의 내장 국제화 기능을 사용하여 다국어 지원 컴포넌트를 만듭니다.',
                template: `<template id="i18n-demo">
  ##!
  // 국제화 문자열 정의
  compomint.addI18ns({
    'i18n-demo': {
      'title': {
        'ko': '국제화 데모',
        'en': 'Internationalization Demo',
        'ja': '国際化デモ',
        'zh': '国际化演示'
      },
      'greeting': {
        'ko': '안녕하세요, {name}님!',
        'en': 'Hello, {name}!',
        'ja': 'こんにちは、{name}さん！',
        'zh': '你好，{name}！'
      },
      'description': {
        'ko': '이것은 Compomint의 국제화 기능 데모입니다.',
        'en': 'This is a demo of Compomint\\'s internationalization feature.',
        'ja': 'これはCompomintの国際化機能のデモです。',
        'zh': '这是Compomint国际化功能的演示。'
      },
      'changeLanguage': {
        'ko': '언어 변경',
        'en': 'Change Language',
        'ja': '言語を変更',
        'zh': '更改语言'
      },
      'currentTime': {
        'ko': '현재 시간',
        'en': 'Current Time',
        'ja': '現在時刻',
        'zh': '当前时间'
      }
    }
  });
  ##
  <style id="style-i18n-demo">
    .i18n-demo {
      padding: 20px;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      background: white;
      max-width: 500px;
      margin: 0 auto;
    }
    .language-selector {
      text-align: center;
      margin-bottom: 20px;
    }
    .language-btn {
      margin: 0 5px;
      padding: 8px 16px;
      border: 1px solid #667eea;
      background: white;
      color: #667eea;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .language-btn.active {
      background: #667eea;
      color: white;
    }
    .language-btn:hover {
      background: #5a67d8;
      color: white;
    }
    .content {
      text-align: center;
      margin: 20px 0;
    }
    .greeting {
      font-size: 1.5rem;
      font-weight: bold;
      color: #667eea;
      margin: 10px 0;
    }
    .time-display {
      margin-top: 20px;
      padding: 15px;
      background: #f8fafc;
      border-radius: 8px;
      border-left: 4px solid #667eea;
    }
  </style>
  ##
  // 현재 언어 상태
  status.currentLang = status.currentLang || 'ko';
  
  // 언어 변경 함수
  function changeLanguage(lang) {
    status.currentLang = lang;
    compomint.i18n.setLang(lang);
    component.refresh();
    updateTime();
  }
  
  // 시간 업데이트 함수
  function updateTime() {
    const timeElement = component.element.querySelector('.current-time');
    if (timeElement) {
      const now = new Date();
      const timeString = now.toLocaleString(getLocaleCode(status.currentLang));
      timeElement.textContent = timeString;
    }
  }
  
  // 언어 코드를 로케일 코드로 변환
  function getLocaleCode(lang) {
    const locales = {
      'ko': 'ko-KR',
      'en': 'en-US',
      'ja': 'ja-JP',
      'zh': 'zh-CN'
    };
    return locales[lang] || 'ko-KR';
  }
  
  // 언어 버튼 클래스 결정
  function getButtonClass(lang) {
    return lang === status.currentLang ? 'language-btn active' : 'language-btn';
  }
  
  // 이름을 인사말에 삽입
  function formatGreeting() {
    return i18n.greeting.replace('{name}', data.userName || '사용자');
  }
  ##
  <div class="i18n-demo">
    <h3>##=i18n.title##</h3>
    
    <div class="language-selector">
      <p>##=i18n.changeLanguage##:</p>
      <button class="##=getButtonClass('ko')##" data-co-event="##:{click: () => changeLanguage('ko')}##">한국어</button>
      <button class="##=getButtonClass('en')##" data-co-event="##:{click: () => changeLanguage('en')}##">English</button>
      <button class="##=getButtonClass('ja')##" data-co-event="##:{click: () => changeLanguage('ja')}##">日本語</button>
      <button class="##=getButtonClass('zh')##" data-co-event="##:{click: () => changeLanguage('zh')}##">中文</button>
    </div>
    
    <div class="content">
      <div class="greeting">##=formatGreeting()##</div>
      <p>##=i18n.description##</p>
      
      <div class="time-display">
        <strong>##=i18n.currentTime##:</strong><br>
        <span class="current-time"></span>
      </div>
    </div>
  </div>
  ###
  // 초기 언어 설정 및 시간 업데이트
  compomint.i18n.setLang(status.currentLang);
  updateTime();
  
  // 1초마다 시간 업데이트
  const timeInterval = setInterval(updateTime, 1000);
  
  // 컴포넌트 제거 시 인터벌 정리
  const originalRemove = component.remove;
  component.remove = function() {
    clearInterval(timeInterval);
    originalRemove.call(this);
  };
  ##
</template>`,
                code: `// 국제화 데모 생성
const i18nDemo = tmpl.I18nDemo({
  userName: '개발자'
});

document.body.appendChild(i18nDemo.element);

// 외부에서 언어 변경
setTimeout(() => {
  // 영어로 변경
  compomint.i18n.setLang('en');
  i18nDemo.status.currentLang = 'en';
  i18nDemo.refresh();
}, 3000);`
            },

            {
                title: '지연 로딩 (Lazy Loading)',
                description: '템플릿과 컴포넌트를 필요할 때만 로드하는 지연 로딩 기법을 학습합니다.',
                template: `<template id="lazy-loader">
  <style id="style-lazy-loader">
    .lazy-loader {
      padding: 20px;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      background: white;
      max-width: 600px;
      margin: 0 auto;
    }
    .loading-indicator {
      text-align: center;
      padding: 40px;
      color: #718096;
    }
    .spinner {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 3px solid #e2e8f0;
      border-radius: 50%;
      border-top-color: #667eea;
      animation: spin 1s ease-in-out infinite;
      margin-right: 10px;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .load-section {
      margin: 20px 0;
      padding: 20px;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      background: #f8fafc;
    }
    .load-btn {
      padding: 10px 20px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      margin: 0 10px 10px 0;
    }
    .load-btn:hover {
      background: #5a67d8;
    }
    .load-btn:disabled {
      background: #a0aec0;
      cursor: not-allowed;
    }
    .loaded-content {
      margin-top: 15px;
      padding: 15px;
      background: white;
      border-radius: 6px;
      border-left: 4px solid #48bb78;
    }
  </style>
  ##
  // 로딩 상태 관리
  status.loadedSections = status.loadedSections || {};
  status.loadingStates = status.loadingStates || {};
  
  // 지연 로딩 함수
  async function loadSection(sectionName, templateUrl) {
    if (status.loadedSections[sectionName]) {
      return; // 이미 로드됨
    }
    
    status.loadingStates[sectionName] = true;
    component.refresh();
    
    try {
      // 템플릿 로드 시뮬레이션 (실제로는 외부 파일에서 로드)
      await new Promise(resolve => setTimeout(resolve, 1500)); // 1.5초 대기
      
      // 동적 템플릿 추가
      const templateContent = getDynamicTemplate(sectionName);
      compomint.addTmpl(sectionName, templateContent);
      
      // 컴포넌트 생성
      const loadedComponent = compomint.tmpl(sectionName)({
        message: \`\${sectionName} 섹션이 성공적으로 로드되었습니다!\`
      });
      
      status.loadedSections[sectionName] = loadedComponent;
      status.loadingStates[sectionName] = false;
      
      component.refresh();
      
    } catch (error) {
      console.error('로딩 실패:', error);
      status.loadingStates[sectionName] = false;
      component.refresh();
    }
  }
  
  // 동적 템플릿 생성 함수
  function getDynamicTemplate(sectionName) {
    const templates = {
      'chart-section': \`
        <div style="padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 8px;">
          <h4>📊 차트 컴포넌트</h4>
          <p>##=data.message##</p>
          <div style="background: rgba(255,255,255,0.2); padding: 15px; border-radius: 6px; margin-top: 10px;">
            <div style="height: 100px; background: rgba(255,255,255,0.3); border-radius: 4px; display: flex; align-items: center; justify-content: center;">
              가상의 차트가 여기에 표시됩니다
            </div>
          </div>
        </div>
      \`,
      'table-section': \`
        <div style="padding: 20px; background: #f0fff4; border: 1px solid #68d391; border-radius: 8px;">
          <h4>📋 테이블 컴포넌트</h4>
          <p>##=data.message##</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr style="background: #68d391; color: white;">
              <th style="padding: 8px; text-align: left;">이름</th>
              <th style="padding: 8px; text-align: left;">값</th>
            </tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">항목 1</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">100</td></tr>
            <tr><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">항목 2</td><td style="padding: 8px; border-bottom: 1px solid #e2e8f0;">200</td></tr>
          </table>
        </div>
      \`,
      'form-section': \`
        <div style="padding: 20px; background: #fef5e7; border: 1px solid #f6ad55; border-radius: 8px;">
          <h4>📝 폼 컴포넌트</h4>
          <p>##=data.message##</p>
          <form style="margin-top: 15px;">
            <div style="margin-bottom: 10px;">
              <label style="display: block; margin-bottom: 5px; font-weight: bold;">이름:</label>
              <input type="text" style="width: 100%; padding: 8px; border: 1px solid #f6ad55; border-radius: 4px;">
            </div>
            <div style="margin-bottom: 10px;">
              <label style="display: block; margin-bottom: 5px; font-weight: bold;">이메일:</label>
              <input type="email" style="width: 100%; padding: 8px; border: 1px solid #f6ad55; border-radius: 4px;">
            </div>
            <button type="button" style="padding: 8px 16px; background: #f6ad55; color: white; border: none; border-radius: 4px; cursor: pointer;">전송</button>
          </form>
        </div>
      \`
    };
    return templates[sectionName] || '<div>템플릿을 찾을 수 없습니다.</div>';
  }
  
  // 로딩 상태 확인
  function isLoading(sectionName) {
    return status.loadingStates[sectionName] || false;
  }
  
  // 로드됨 상태 확인
  function isLoaded(sectionName) {
    return !!status.loadedSections[sectionName];
  }
  ##
  <div class="lazy-loader">
    <h3>지연 로딩 데모</h3>
    <p>버튼을 클릭하여 필요한 컴포넌트를 동적으로 로드합니다.</p>
    
    <div class="load-section">
      <h4>섹션 로더</h4>
      <button class="load-btn" 
              data-co-event="##:{click: () => loadSection('chart-section', '/templates/chart.html')}##"
              ##=isLoaded('chart-section') ? 'disabled' : ''##>
        ##=isLoaded('chart-section') ? '✓ 차트 로드됨' : '📊 차트 로드'##
      </button>
      <button class="load-btn" 
              data-co-event="##:{click: () => loadSection('table-section', '/templates/table.html')}##"
              ##=isLoaded('table-section') ? 'disabled' : ''##>
        ##=isLoaded('table-section') ? '✓ 테이블 로드됨' : '📋 테이블 로드'##
      </button>
      <button class="load-btn" 
              data-co-event="##:{click: () => loadSection('form-section', '/templates/form.html')}##"
              ##=isLoaded('form-section') ? 'disabled' : ''##>
        ##=isLoaded('form-section') ? '✓ 폼 로드됨' : '📝 폼 로드'##
      </button>
    </div>
    
    <!-- 차트 섹션 -->
    ##if (isLoading('chart-section')) {##
      <div class="loading-indicator">
        <div class="spinner"></div>
        차트 컴포넌트를 로딩 중...
      </div>
    ##} else if (status.loadedSections['chart-section']) {##
      <div class="loaded-content">
        ##%status.loadedSections['chart-section']##
      </div>
    ##}##
    
    <!-- 테이블 섹션 -->
    ##if (isLoading('table-section')) {##
      <div class="loading-indicator">
        <div class="spinner"></div>
        테이블 컴포넌트를 로딩 중...
      </div>
    ##} else if (status.loadedSections['table-section']) {##
      <div class="loaded-content">
        ##%status.loadedSections['table-section']##
      </div>
    ##}##
    
    <!-- 폼 섹션 -->
    ##if (isLoading('form-section')) {##
      <div class="loading-indicator">
        <div class="spinner"></div>
        폼 컴포넌트를 로딩 중...
      </div>
    ##} else if (status.loadedSections['form-section']) {##
      <div class="loaded-content">
        ##%status.loadedSections['form-section']##
      </div>
    ##}##
  </div>
</template>`,
                code: `// 지연 로딩 데모 생성
const lazyLoader = tmpl.LazyLoader({});
document.body.appendChild(lazyLoader.element);

// 프로그래밍 방식으로 섹션 로드
setTimeout(() => {
  // 3초 후 자동으로 차트 섹션 로드
  const loadFunction = lazyLoader.element.querySelector('[data-section="chart"]');
  if (loadFunction) {
    // 실제로는 컴포넌트의 loadSection 함수를 호출
    console.log('자동으로 차트 섹션을 로드합니다...');
  }
}, 3000);`
            }
        ];
    }

    // 실전 예제 샘플들
    defineRealworldSamples() {
        this.samples.realworld = [
            {
                title: '미니 쇼핑몰',
                description: '실제 쇼핑몰과 유사한 기능을 가진 미니 애플리케이션입니다. 상품 목록, 장바구니, 주문 기능을 포함합니다.',
                template: `<!-- 상품 카드 템플릿 -->
<template id="product-card">
  <style id="style-product-card">
    .product-card {
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
      background: white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    .product-image {
      width: 100%;
      height: 200px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 48px;
      position: relative;
    }
    .product-badge {
      position: absolute;
      top: 10px;
      right: 10px;
      background: #ff6b6b;
      color: white;
      padding: 4px 8px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: bold;
    }
    .product-info {
      padding: 16px;
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .product-name {
      font-size: 18px;
      font-weight: bold;
      color: #2d3748;
      margin-bottom: 8px;
    }
    .product-description {
      color: #718096;
      font-size: 14px;
      margin-bottom: 12px;
      flex: 1;
    }
    .product-price {
      font-size: 20px;
      font-weight: bold;
      color: #667eea;
      margin-bottom: 12px;
    }
    .product-actions {
      display: flex;
      gap: 8px;
    }
    .btn-cart {
      flex: 1;
      padding: 10px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.2s ease;
    }
    .btn-cart:hover {
      background: #5a67d8;
    }
    .btn-cart:disabled {
      background: #a0aec0;
      cursor: not-allowed;
    }
  </style>
  ##
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ko-KR').format(price) + '원';
  };
  
  const addToCart = () => {
    if (data.onAddToCart) {
      data.onAddToCart(data);
    }
  };
  ##
  <div class="product-card">
    <div class="product-image">
      ##=data.emoji || '📦'##
      ##if (data.isNew) {##
        <span class="product-badge">NEW</span>
      ##}##
    </div>
    <div class="product-info">
      <h4 class="product-name">##=data.name##</h4>
      <p class="product-description">##=data.description##</p>
      <div class="product-price">##=formatPrice(data.price)##</div>
      <div class="product-actions">
        <button class="btn-cart" data-co-event="##:{click: addToCart}##"
                ##=data.stock <= 0 ? 'disabled' : ''##>
          ##=data.stock <= 0 ? '품절' : '장바구니 담기'##
        </button>
      </div>
    </div>
  </div>
</template>

<!-- 쇼핑몰 메인 템플릿 -->
<template id="mini-shop">
  <style id="style-mini-shop">
    .mini-shop {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
    }
    .shop-header {
      text-align: center;
      margin-bottom: 30px;
      padding: 30px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border-radius: 12px;
    }
    .shop-stats {
      display: flex;
      justify-content: center;
      gap: 30px;
      margin-top: 20px;
    }
    .stat-item {
      text-align: center;
    }
    .stat-number {
      font-size: 24px;
      font-weight: bold;
    }
    .stat-label {
      font-size: 14px;
      opacity: 0.9;
    }
    .product-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 20px;
      margin-bottom: 30px;
    }
    .cart-section {
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 20px;
      position: sticky;
      top: 20px;
    }
    .cart-header {
      display: flex;
      align-items: center;
      justify-content: between;
      margin-bottom: 15px;
      padding-bottom: 15px;
      border-bottom: 1px solid #e2e8f0;
    }
    .cart-title {
      font-size: 18px;
      font-weight: bold;
      color: #2d3748;
    }
    .cart-count {
      background: #667eea;
      color: white;
      padding: 4px 8px;
      border-radius: 50%;
      font-size: 12px;
      font-weight: bold;
      margin-left: 10px;
    }
    .cart-item {
      display: flex;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #f7fafc;
    }
    .cart-item:last-child {
      border-bottom: none;
    }
    .cart-item-info {
      flex: 1;
    }
    .cart-item-name {
      font-weight: bold;
      color: #2d3748;
      font-size: 14px;
    }
    .cart-item-price {
      color: #718096;
      font-size: 13px;
    }
    .cart-total {
      margin-top: 15px;
      padding-top: 15px;
      border-top: 2px solid #e2e8f0;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      color: #667eea;
    }
    .btn-checkout {
      width: 100%;
      margin-top: 15px;
      padding: 12px;
      background: #48bb78;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
      font-size: 16px;
    }
    .btn-checkout:hover {
      background: #38a169;
    }
    .btn-checkout:disabled {
      background: #a0aec0;
      cursor: not-allowed;
    }
    .empty-cart {
      text-align: center;
      color: #718096;
      padding: 20px;
      font-style: italic;
    }
  </style>
  ##
  // 상품 데이터
  const products = [
    {
      id: 1, name: '스마트폰', price: 899000, description: '최신 기술이 적용된 고성능 스마트폰', 
      emoji: '📱', stock: 10, isNew: true
    },
    {
      id: 2, name: '노트북', price: 1299000, description: '가벼우면서도 강력한 성능의 노트북', 
      emoji: '💻', stock: 5, isNew: false
    },
    {
      id: 3, name: '무선 이어폰', price: 199000, description: '뛰어난 음질의 무선 이어폰', 
      emoji: '🎧', stock: 15, isNew: true
    },
    {
      id: 4, name: '스마트 워치', price: 399000, description: '건강 관리와 알림 기능이 있는 스마트 워치', 
      emoji: '⌚', stock: 8, isNew: false
    },
    {
      id: 5, name: '태블릿', price: 699000, description: '대화면으로 즐기는 엔터테인먼트', 
      emoji: '📟', stock: 0, isNew: false
    },
    {
      id: 6, name: '카메라', price: 1599000, description: '전문가급 사진 촬영이 가능한 카메라', 
      emoji: '📷', stock: 3, isNew: true
    }
  ];
  
  // 장바구니 상태
  status.cart = status.cart || [];
  status.orderHistory = status.orderHistory || [];
  
  // 장바구니에 상품 추가
  function addToCart(product) {
    const existingItem = status.cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      status.cart.push({
        ...product,
        quantity: 1
      });
    }
    
    component.refresh();
    showToast(\`\${product.name}이(가) 장바구니에 추가되었습니다!\`);
  }
  
  // 토스트 메시지 표시
  function showToast(message) {
    const toast = document.createElement('div');
    toast.style.cssText = \`
      position: fixed;
      top: 20px;
      right: 20px;
      background: #48bb78;
      color: white;
      padding: 12px 20px;
      border-radius: 8px;
      z-index: 1000;
      animation: slideIn 0.3s ease;
    \`;
    toast.textContent = message;
    
    // 애니메이션 추가
    const style = document.createElement('style');
    style.textContent = \`
      @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
    \`;
    document.head.appendChild(style);
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.remove();
      style.remove();
    }, 3000);
  }
  
  // 주문하기
  function checkout() {
    if (status.cart.length === 0) return;
    
    const order = {
      id: Date.now(),
      items: [...status.cart],
      total: calculateTotal(),
      date: new Date().toLocaleDateString('ko-KR')
    };
    
    status.orderHistory.push(order);
    status.cart = [];
    component.refresh();
    
    showToast(\`주문이 완료되었습니다! 총 \${formatPrice(order.total)}\`);
  }
  
  // 총 금액 계산
  function calculateTotal() {
    return status.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
  
  // 가격 포맷팅
  function formatPrice(price) {
    return new Intl.NumberFormat('ko-KR').format(price) + '원';
  }
  
  // 상품 카드 생성
  const productCards = products.map(product => 
    tmpl.ProductCard({
      ...product,
      onAddToCart: addToCart
    })
  );
  ##
  <div class="mini-shop">
    <div class="shop-header">
      <h1>🛍️ 미니 쇼핑몰</h1>
      <p>Compomint로 만든 실전 쇼핑몰 예제</p>
      <div class="shop-stats">
        <div class="stat-item">
          <div class="stat-number">##=products.length##</div>
          <div class="stat-label">전체 상품</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">##=status.cart.length##</div>
          <div class="stat-label">장바구니</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">##=status.orderHistory.length##</div>
          <div class="stat-label">주문 완료</div>
        </div>
      </div>
    </div>
    
    <div style="display: grid; grid-template-columns: 1fr 350px; gap: 30px;">
      <!-- 상품 목록 -->
      <div>
        <h2>상품 목록</h2>
        <div class="product-grid">
          ##%productCards##
        </div>
      </div>
      
      <!-- 장바구니 -->
      <div class="cart-section">
        <div class="cart-header">
          <span class="cart-title">🛒 장바구니</span>
          <span class="cart-count">##=status.cart.length##</span>
        </div>
        
        ##if (status.cart.length === 0) {##
          <div class="empty-cart">
            장바구니가 비어있습니다
          </div>
        ##} else {##
          ##status.cart.forEach(item => {##
            <div class="cart-item">
              <div style="margin-right: 10px; font-size: 20px;">##=item.emoji##</div>
              <div class="cart-item-info">
                <div class="cart-item-name">##=item.name## (##=item.quantity##개)</div>
                <div class="cart-item-price">##=formatPrice(item.price * item.quantity)##</div>
              </div>
            </div>
          ##});##
          
          <div class="cart-total">
            총액: ##=formatPrice(calculateTotal())##
          </div>
          
          <button class="btn-checkout" data-co-event="##:{click: checkout}##">
            주문하기
          </button>
        ##}##
      </div>
    </div>
  </div>
</template>`,
                code: `// 미니 쇼핑몰 생성
const miniShop = tmpl.MiniShop({});
document.body.appendChild(miniShop.element);

// 쇼핑몰 상태 확인
console.log('장바구니:', miniShop.status.cart);
console.log('주문 내역:', miniShop.status.orderHistory);

// 프로그래밍 방식으로 상품 추가
setTimeout(() => {
  // 스마트폰을 장바구니에 자동 추가
  const smartphone = {
    id: 1, name: '스마트폰', price: 899000, 
    emoji: '📱', quantity: 1
  };
  
  miniShop.status.cart.push(smartphone);
  miniShop.refresh();
  console.log('자동으로 스마트폰이 장바구니에 추가되었습니다!');
}, 2000);`
            }
        ];
    }

    // 샘플을 렌더링하는 함수
    renderSample(sample, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const sampleElement = this.createSampleElement(sample);
        container.appendChild(sampleElement);
    }

    // 샘플 Element 생성
    createSampleElement(sample) {
        const div = document.createElement('div');
        div.className = 'sample-container';
        
        div.innerHTML = `
            <div class="sample-header">
                <h3>${sample.title}</h3>
            </div>
            <div class="sample-description">
                <p>${sample.description}</p>
            </div>
            <div class="playground-area" id="playground-${Date.now()}">
                <!-- 플레이그라운드가 여기에 추가됩니다 -->
            </div>
        `;

        // 플레이그라운드 생성
        const playgroundContainer = div.querySelector('.playground-area');
        this.createPlayground(sample, playgroundContainer);

        return div;
    }

    // 플레이그라운드 생성
    createPlayground(sample, container) {
        try {
            // 템플릿이 있는 경우 추가
            if (sample.template) {
                compomint.addTmpls(sample.template);
            }

            // TestArea 컴포넌트 생성
            const playground = tmpl.pg.TestArea({
                imports: [
                    {type: 'css', text: 'css/output.css'}
                ],
                template: sample.template || '',
                code: sample.code || '',
                type: sample.template ? 'codeIsTemplateFile' : 'javascript',
                showConsole: true
            });

            container.appendChild(playground.element);
            
        } catch (error) {
            console.error('플레이그라운드 생성 실패:', error);
            container.innerHTML = `
                <div class="alert alert-danger">
                    플레이그라운드 생성에 실패했습니다: ${error.message}
                </div>
            `;
        }
    }

    // 모든 샘플 렌더링
    renderAllSamples() {
        // 각 카테고리별로 샘플 렌더링
        Object.keys(this.samples).forEach(category => {
            const containerId = `${category}Samples`;
            const samples = this.samples[category];
            
            samples.forEach(sample => {
                this.renderSample(sample, containerId);
            });
        });
    }
}

// 샘플 초기화 함수
function initializeSamples() {
    // Compomint 및 tmpl 네임스페이스 확인
    if (typeof compomint === 'undefined' || typeof tmpl === 'undefined') {
        console.warn('Compomint가 로드되지 않았습니다. 1초 후 재시도...');
        setTimeout(initializeSamples, 1000);
        return;
    }

    // playground 컴포넌트 확인
    if (!tmpl.pg || !tmpl.pg.TestArea) {
        console.warn('플레이그라운드 컴포넌트가 로드되지 않았습니다. 1초 후 재시도...');
        setTimeout(initializeSamples, 1000);
        return;
    }

    try {
        const samplesManager = new CompomintSamples();
        
        // 각 카테고리의 컨테이너가 존재하는지 확인하고 렌더링
        ['basic', 'components', 'advanced', 'realworld'].forEach(category => {
            const containerId = `${category}Samples`;
            const container = document.getElementById(containerId);
            
            if (container) {
                console.log(`${category} 샘플 렌더링 시작...`);
                samplesManager.samples[category].forEach(sample => {
                    try {
                        samplesManager.renderSample(sample, containerId);
                    } catch (error) {
                        console.error(`샘플 렌더링 실패 (${sample.title}):`, error);
                    }
                });
            } else {
                console.warn(`컨테이너를 찾을 수 없습니다: ${containerId}`);
            }
        });
        
        console.log('샘플 페이지 초기화 완료');
    } catch (error) {
        console.error('샘플 초기화 실패:', error);
    }
}
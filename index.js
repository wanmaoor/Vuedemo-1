// 双向绑定

new Vue({
  el: "#app",
  data: {
    message: "input something"
  }
});

let app1 = new Vue({
  el: "#app1",
  data: {
    newName: "",
    names: ["Jack", "Susan", "Lee", "Michael"]
  },
  methods: {
    push() {
      this.names.push(this.newName);
      this.newName = "";
    },
    pop() {
      this.names.pop(this.names[this.names.length - 1]);
    }
  }
  // mounted() {
  //   document.querySelector('#button').addEventListener('click', ()=>{
  //     let name = document.querySelector('#input')
  //     this.names.push(name.value)
  //     name.value = ''
  //   })
  // }
});

let app2 = new Vue({
  el: "#app2",
  data: {
    isLoading: false,
    text: "click me"
  },
  methods: {
    toggleClass() {
      this.isLoading = !this.isLoading;
    }
  }
});

let app3 = new Vue({
  el: "#app3",
  data: {
    tasks: [
      {
        description: "eat",
        completed: true
      },
      {
        description: "drink",
        completed: false
      },
      {
        description: "sleep",
        completed: false
      }
    ]
  },
  computed: {
    incompleted() {
      return this.tasks.filter(task => !task.completed);
    },
    completed() {
      return this.tasks.filter(task => task.completed);
    }
  }
});
//component
Vue.component("tasklist", {
  template: `
  <div>
    <task v-for="task in tasks" :key="task.id">{{ task.task }}</task>
  </div>
  `,
  data() {
    return {
      tasks: [
        {
          id: 1,
          task: "eat",
          completed: true
        },
        {
          id: 2,
          task: "drink",
          completed: false
        },
        {
          id: 3,
          task: "sleep",
          completed: false
        }
      ]
    };
  }
});
Vue.component("task", {
  template: `
    <li><slot></slot></li>
  `
});
let app4 = new Vue({
  el: "#app4",
  data: {}
});

Vue.component("message", {
  props: ["title", "body"],
  data() {
    return {
      isVisible: true
    };
  },
  template: `
  <article class="message" v-show="isVisible">
    <div class="message-header">
      {{ title }}
      <button class="delete" aria-label="delete" @click="hideModal"></button>
    </div>
    <div class="message-body">
      {{ body }}
    </div>
  </article>
  `,
  methods: {
    hideModal() {
      return (this.isVisible = !this.isVisible);
    }
  }
});

let app5 = new Vue({
  el: "#app5"
});

Vue.component("modal", {
  template: `
  <div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-content">
    <div class="box">
      <p>
        HELLO! WORLD! 
      </p>
    </div>
  </div>
  <button class="modal-close is-large" aria-label="close" @click="$emit('close')"></button>
</div>
  `
});
let app6 = new Vue({
  el: "#app6",
  data: {
    showModal: false
  },
  methods: {
    togglemodal() {
      return (this.showModal = !this.showModal);
    }
  }
});

//tabs component
Vue.component("tabs", {
  template: `
  <div>
    <div class="tabs">
      <ul>
        <li v-for="tab in tabs" :class="{'is-active': tab.isActive}">
          <a :href="tab.href" @click="selectTab(tab)">{{ tab.name }}</a>
        </li>
      </ul>
    </div>
    <div class="tabs-details">
      <slot></slot>
    </div>
  </div>
  `,
  data() {
    return {
      tabs: []
    };
  },
  created() {
    this.tabs = this.$children;
  },
  methods: {
    selectTab(selectTab) {
      this.tabs.forEach(tab => {
        tab.isActive = tab.name === selectTab.name;
      });
    }
  }
});

Vue.component("tab", {
  template: `
    <div v-show="isActive"><slot></slot></div>
  `,
  props: {
    name: true,
    selected: false
  },
  computed: {
    href() {
      return "#" + this.name.toLowerCase().replace(/ /g, "-");
    }
  },
  data() {
    return {
      isActive: false
    };
  },
  mounted() {
    this.isActive = this.selected;
  }
});
let app7 = new Vue({
  el: "#app7"
});

//component communication
window.Event = new Vue();
Vue.component("coupon", {
  template: `<input placeholder="Enter coupon code" @blur="onCouponApplied">`,
  methods: {
    onCouponApplied() {
      Event.$emit("applied");
    }
  }
});
let app8 = new Vue({
  el: "#app8",
  data: {
    couponApplied: false
  },
  methods: {
    onCouponApplied() {
      this.couponApplied = true;
    }
  },
  created() {
    Event.$on("applied", () => {
      alert("Handing it!");
    });
  }
});

//slots component
Vue.component("complex-modal", {
  template: `
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">
          <slot name="header"></slot>
        </p>
        <button class="delete" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <slot></slot>
      </section>
      <footer class="modal-card-foot">
        <slot name="footer">
          <button class="button is-success">Save changes</button>
          <button class="button" @click="$emit('close')">Cancel</button>
        </slot>
      </footer>
    </div>
  </div>  
  `
});
let app9 = new Vue({
  el: "#app9",
  data: {
    isVisible: false
  },
  methods: {
    close() {
      this.isVisible = !this.isVisible;
    }
  }
});

//inline template
Vue.component("progressed", {
  data() {
    return {
      amount: 10
    };
  }
});
new Vue({
  el: "#app10"
});

//全局指令: directives
Vue.directive("focus", {
  inserted(el) {
    el.focus();
    //el is <input >
  }
});

new Vue({
  el: "#app11"
});

// 全局指令: extends
var authorExtend = Vue.extend({
  template: `<p><a :href='authorURL'>{{authorName}}</a></p>`,
  data: function() {
    return {
      authorName: "Joe",
      authorURL: "https://baidu.com"
    };
  }
});
// 挂載
new authorExtend().$mount("author");

// 全局指令: set

let outData = {
  n: 0,
  arr: ["aaa", "bbb", "ccc"]
};

let app13 = new Vue({
  el: "#app13",
  data: outData
});

function add() {
  // app13.n++
  // Vue.set(outData,'n', 34 )
  // app13.arr[1] = 'ddd' //改變下標的值並沒有觸發Vue對於VirtualDOM的更新
  Vue.set(app13.arr, "1", "dd"); //使用Vue.set()方法, 更新virtualDOM
}

let app14 = new Vue({
  el: "#app14",
  data: {
    num: 0
  },
  methods: {
    addOne() {
      this.num++;
    }
  },
  beforeCreate() {
    console.log("1 - beforeCreate 初始化前");
  },
  created() {
    console.log("2 - created 创建完成");
  },
  beforeMount() {
    console.log("3 - beforeMount 挂载之前");
  },
  mounted() {
    console.log("4 - mounted 挂载之后");
  },
  beforeUpdate() {
    console.log("5 - beforeUpdate 更新之前");
  },
  updated() {
    console.log("6 - updated 更新之后");
  },
  activated() {
    console.log("7 - actived");
  },
  deactivated() {
    console.log("8 - deactived");
  },
  beforeDestroy() {
    console.log("9 - beforeDestroy 销毁之前");
  },
  destroyed() {
    console.log("10 - destroyed 销毁之后");
  }
});

//Props
Vue.component("blog-post", {
  props: ["title"],
  template: `
    <h2>{{title}}</h2>
  `
});
let app15 = new Vue({
  el: "#app15",
  data: {
    post: {
      title: "這段内容是動態綁定Props的文字"
    }
  }
});

let Header = Vue.extend({
  template: `<p>{{msg}} - {{propsData}}</p>`,
  data: () => ({ msg: "使用extend指令生成内容" }),
  props: ['propsData']
});
let val = '使用propsData生成内容'
new Header({propsData: {propsData: val}}).$mount("#header");

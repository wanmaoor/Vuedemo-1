// 双向绑定

new Vue({
  el: "#app",
  data: {
    message: 'input something'
  }
})


let app1 = new Vue({
  el: "#app1",
  data: {
    newName: '',
    names: ['Jack', 'Susan', 'Lee', 'Michael']
  },
  methods: {
    push() {
      this.names.push(this.newName)
      this.newName = ''
    },
    pop() {
      this.names.pop(this.names[this.names.length - 1])
    }
  }
  // mounted() {
  //   document.querySelector('#button').addEventListener('click', ()=>{
  //     let name = document.querySelector('#input')
  //     this.names.push(name.value)
  //     name.value = ''
  //   })
  // }
})

let app2 = new Vue({
  el: "#app2",
  data: {
    isLoading: false,
    text: "click me"
  },
  methods: {
    toggleClass() {
      this.isLoading = !this.isLoading
    }
  }
})

let app3 = new Vue({
  el: "#app3",
  data: {
    tasks: [{
        description: 'eat',
        completed: true
      },
      {
        description: 'drink',
        completed: false
      },
      {
        description: 'sleep',
        completed: false
      }
    ]
  },
  computed: {
    incompleted() {
      return this.tasks.filter(task => !task.completed)
    },
    completed(){
      return this.tasks.filter(task => task.completed)
    }
  }
})
//component
Vue.component('tasklist', {
  template: `
  <div>
    <task v-for="task in tasks" :key="task.id">{{ task.task }}</task>
  </div>
  `,
  data() {
    return {
      tasks: [{
          id: 1,
          task: 'eat',
          completed: true
        },
        {
          id: 2,
          task: 'drink',
          completed: false
        },
        {
          id: 3,
          task: 'sleep',
          completed: false
        }
      ]
    }
  }
})
Vue.component('task', {
  template: `
    <li><slot></slot></li>
  `
})
let app4 = new Vue({
  el: "#app4",
  data: {}
})


Vue.component('message', {
  props: ['title', 'body'],
  data(){
    return {
      isVisible: true
    }
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
    hideModal(){
      return this.isVisible = !this.isVisible
    }
  }
})

let app5 = new Vue({
  el: "#app5",
})

Vue.component('modal', {
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
})
let app6 = new Vue({
  el: "#app6",
  data: {
    showModal: false
  },
  methods: {
    togglemodal(){
      return this.showModal = !this.showModal
    }
  }
})

//tabs component
Vue.component('tabs', {
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
  data(){
    return {
      tabs: []
    }
  },
  created(){
    this.tabs = this.$children
  },
  methods: {
    selectTab(selectTab){
      this.tabs.forEach(tab => {
        tab.isActive = (tab.name === selectTab.name)
      })
    }
  }
})

Vue.component('tab', {
  template: `
    <div v-show="isActive"><slot></slot></div>
  `,
  props: {
    name: true,
    selected: false
  },
  computed: {
    href(){
      return '#' + this.name.toLowerCase().replace(/ /g, '-')
    }
  },
  data(){
    return {
      isActive: false
    }
  },
  mounted() {
    this.isActive = this.selected
  },
})
let app7 = new Vue({
  el: "#app7",

})

//component communication
window.Event = new Vue()
Vue.component('coupon', {
  template: `<input placeholder="Enter coupon code" @blur="onCouponApplied">`,
  methods: {
    onCouponApplied(){
      Event.$emit('applied')
    }
  }
})
let app8 = new Vue({
  el: "#app8",
  data: {
    couponApplied: false
  },
  methods: {
    onCouponApplied(){
      this.couponApplied = true
    }
  },
  created(){
    Event.$on('applied', ()=>{alert('Handing it!')})
  }
})

//slots component
Vue.component('complex-modal', {
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
})
let app9 = new Vue({
  el: "#app9",
  data: {
    isVisible: true
  },
  methods: {
    close(){
      this.isVisible = !this.isVisible
    }
  }
})

//inline template
Vue.component('progressed', {
  data(){
    return {
      amount: 10
    }
  }
})
new Vue({
  el: "#app10"
})

//mixin
let myMixin = {
  created(){
    this.hello()
  },
  methods: {
    hello(){
      console.log('hello from mixin');
    }
  }
}

let Component = Vue.extend({
  mixins: [myMixin]
})
let component = new Component()

//mixin merge

//merge object, so does in methods, components and directives, instance option will take priority
let dataMixin = {
  data(){
    return {
      message: "hello",
      foo: 'abc'
    }
  }
}

new Vue({
  mixins: [dataMixin],
  data(){
    return {
      message: 'goodbye',// goodbye will replace hello to become the value of message
      bar: 'def'
    }
  },
  created(){
    console.log(this.$data);
    
  }
})

//merge life cycle

//mounted does'nt show
let functionMixin = {
  created(){
    console.log('mixin hook called in created');
    
  },
  mounted(){
    console.log('mix in hook called in mounted');
  }
}

new Vue({
  mixins: [functionMixin],
  created(){
    console.log('component hook called in created ');
  }, 
  mounted(){
    console.log('component hook called in mounted');
    
  }
})

//global mixin
//when all instances need  common hooks, methods or objects, you can use global mixin to
//reduce repeatedly write same codes, but with caution when use it
Vue.mixin({
  created(){
    let myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption);
      
    }
  }
})

new Vue({
  myOption: 'I\'m 1st option'
})

new Vue({
  myOption: 'I\'m 2nd option'
})

//custom option merge strategy

Vue.config.optionMergeStrategies.myOwnOption = (toVal, fromVal)=>{
  // what you want to do
}

//custom directives
Vue.directive('focus', {
  inserted(el){
    el.focus()
    //el is <input >
  }
})

new Vue({
  el: "#app11"
})

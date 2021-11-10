import Vue from 'vue'
import Main from './path.vue'

let PathConstructor = Vue.extend(Main)

let instance
let instances = []

const CreatePath = function(start,end,origin){
    const hashID='PATH_'+(origin[0]+origin[1])
    if(instances[hashID]!==undefined){
        instances[hashID].close()
    }
    instance = new PathConstructor({
        data: {
            start,
            end,
            path:''
        }
    })
    instance.hashID = hashID
    instance.vm = instance.$mount()
    document.getElementById("my-svg").appendChild(instance.vm.$el)
    instance.vm.visible = true
    instance.dom = instance.vm.$el
    instances[hashID]=instance
}

export default CreatePath

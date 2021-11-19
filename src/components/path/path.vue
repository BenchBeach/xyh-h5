<template>
    <path fill="transparent" :style="style" stroke="#ffffff" stroke-width="1" :d="path" stroke-linecap="round"
          class="svg-path"></path>
</template>
<script>
export default {
    name: 'path',
    data() {
        return {
            start: [],
            end: [],
            path: '',
            closed: false,
            style:''
        }
    },
    mounted() {
        this.path = this.createCPath(this.start[0], this.start[1], this.end[0], this.end[1])
        let length=Math.pow(Math.pow(this.end[0]-this.start[0],2)+Math.pow(this.end[1]-this.start[1],2),0.5)
        let allLength=Math.pow(Math.pow(screen.height,2)+Math.pow(screen.width,2),0.5)
        this.style=`animation: dash ${8*allLength/length}s linear;`
    },
    watch: {
        closed(val) {
            if (val) {
                this.destroyElement()
            }
        },
    },
    methods: {
        createCPath(x1, y1, x2, y2) {
            x1=Math.max(0,x1)
            x2=Math.max(0,x2)
            y1=Math.max(0,y1)
            y2=Math.max(0,y2)
            let path = "M" + x1 + " " + y1 + " ";
            var cx1 = x1+(Math.random()*24);
            var cy1 = ((y1 + y2) / 2)+(Math.random()*10);
            var c = "Q" + cx1 + " " + cy1 + ",";
            path = path + c + x2 + " " + y2;
            return path;
        },
        destroyElement() {
            this.$destroy(true);
            this.$el.parentNode.removeChild(this.$el);
        },
        close() {
            this.closed = true;
        }
    }
}
</script>
<style lang="scss">
.svg-path {
    opacity: 0.3;
    stroke-dasharray: 1800;
    stroke-dashoffset: 0;
    //animation: dash 2s linear;
    z-index: 100;
}

@keyframes dash {
    from {
        stroke-dashoffset: 1800;
    }
    to {
        stroke-dashoffset: 0;
    }
}


</style>

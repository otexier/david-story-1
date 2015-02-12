agbeServices.value('dynamicCommands', {
    common: {
        props: {
        }
    },


    leftPart: {
        templates: ['common'],
        props: {
            left: '0%',
            right: '50%',
            top:'0%',
            bottom:'100%'
        }
    },

    rightPart: {
        templates: ['common'],
        props: {
            left: '50%',
            right: '100%',
            top:'0%',
            bottom:'100%'
        }
    },

    img_full: {
        templates: ['common'],
        props: {
            left:'0%',
            top:'0%',
            bottom:'100%',
            img:{
                ratio:'keep'
            }
        }
    },

    rc: {
        props: {
            right: '60%'
        }
    },


    height_0_10: {
        templates: ['common'],
        props: {
            left:'0%',
            right:'100%',
            top:'0%',
            bottom:'10%'
        }
    },

    height_10_70: {
        templates: ['common'],
        props: {
            left:'0%',
            right:'100%',
            top:'10%',
            bottom:'70%'
        }
    },
    height_10_80: {
        templates: ['common'],
        props: {
            left: '0%',
            right: '100%',
            top:'10%',
            bottom:'80%'
        }
    },
    height_70_100: {
        templates: ['common'],
        props: {
            left:'0%',
            right:'100%',
            top:'70%',
            bottom:'100%'
        }
    },

    height_80_100: {
        templates: ['common'],
        props: {
            left:'0%',
            right:'100%',
            top:'80%',
            bottom:'100%'
        }
    },

    1: {
        templates: ['rc', 'level1','parent_relative'],
        props: {
            left:'3%',
            right:'50%',
            bottom:'100%',
            img:{
                ratio:'keep'
            }
        }
    },

    2: {
        templates: ['rc', 'level1'],
        props: {
            left:'55%',
            right:'75%',
            top:'3%'
        }
    },

    3: {
        props: {
            left:'76%',
            top:'5%',
            bottom:'95%',
            img:{
                ratio:'keep'
            }
        }
    }

});
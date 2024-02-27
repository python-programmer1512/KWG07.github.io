const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.mole')]
const hole_out = new Array(holes.length).fill(0);
const scoreEl = document.querySelector('.score span')
const TIMER=document.querySelector('.timer span');
let score = 0


function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


const fastapi = (operation, url, params, success_callback, failure_callback) => {
    let method = operation
    let content_type = 'application/json'
    let body = JSON.stringify(params) /*{"content":"입력"}*/
    if(operation === 'login') {
        method = 'post'
        content_type = 'application/x-www-form-urlencoded'
        body = qs.stringify(params)
    }


    let _url = import.meta.env.VITE_SERVER_URL+url
    if(method === 'get') {
        _url += "?" + new URLSearchParams(params)
    }
    let options = {
        method: method,
        headers: {
            "Content-Type": content_type
        }
    }

    const _access_token = get(access_token)
    if (_access_token) {
        options.headers["Authorization"] = "Bearer " + _access_token
    }

    if (method !== 'get') {
        options['body'] = body
    }

    fetch(_url, options)
        .then(response => { /* fetch 를 통해 들어온 값이 then 의 response 에 입력되서 then 안에 있는 임의 함수를 실행함*/
            
        if(response.status === 204) {  // No content
                if(success_callback) {
                    success_callback()
                }
                return
            }
            response.json()
                .then(json => {

                    if(response.status >= 200 && response.status < 300) {  // 200 ~ 299
                        if(success_callback) {
                            success_callback(json)
                        }
                        return

                    }else {
                        if (failure_callback) {
                            failure_callback(json)
                        }else {
                            alert(JSON.stringify(json))
                        }
                    }
                })
                .catch(error => {
                    alert(JSON.stringify(error))
                })
        })
}

function get_rank_class(_class) {
    fastapi("get", "/api/rank/class/list/" + _class, {}, (json) => {
        
        class_rank_list = json.rank_list
        for(const [index, all_rank] of class_rank_list.entries()){
            users_rank(all_rank.user_id,all_rank.score,index)

        }
    })
}


function game_start(){
    for(var i=0;i<holes.length;i++){
        const hole = holes[i]
        const img = document.createElement('img')
        img.classList.add('mole-down')
        img.src = './image/mole.png'
        img.id = 'mole-movement_'+i
        
        hole.appendChild(img)

        const span = document.createElement('span')
        let mole_text=document.createTextNode('a')
        span.classList.add('text-down')
        span.appendChild(mole_text)
        span.id = 'text-movement_'+i

        hole.appendChild(span)



    }
}

function mole_move(A,B,i){ /* class : A -> B, down : {A:mole-rise,B:mole-down}, up : {A:mole-down,B:mole-rise} */
    const mole_before_class = "mole-"+A
    const mole_after_class = "mole-"+B

    const text_before_class = "text-"+A
    const text_after_class = "text-"+B

    const before_class = document.getElementById("mole-movement_"+i)
    before_class.classList.replace(mole_before_class,mole_after_class)

    const before_class_text = document.getElementById("text-movement_"+i)
    before_class_text.classList.replace(text_before_class,text_after_class)


}

function updateTimer() {
    const future = Date.parse("2024/01/01 00:00:00")
    const now = new Date()
    const diff = future - now

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const mins = Math.floor(diff / (1000 * 60))
    const secs = Math.floor(diff / 1000)

    const d = days
    const h = hours - days * 24
    const m = mins - hours * 60
    const s = secs - mins * 60

    return s

}

function run(i){

    const hole = holes[i]
    let timer = null
    let uptimer = null
    TIMER.textContent = updateTimer()
    console.log(TIMER.textContent)

    uptimer = setTimeout(() => { /* 두더지가 올라오기전 대기 시간 */
        const img = document.getElementsByTagName('img')[i]
        const span = document.getElementsByTagName('span')[i]

        /* 변경 */

        span.innerHTML = "hello";
        mole_move('down','rise',i)
        hole_out[i]=1

        img.addEventListener('click', () => { /* 두더지를 때렸을 때*/
            if(hole_out[i]===1){
                hole_out[i]=0
                score += 10
                scoreEl.textContent = score
                clearTimeout(timer)
                mole_move('rise','down',i)
                run(i)
        
                setTimeout(() => {
                }, rand(1000,5000)) /* 다음 두더지가 나오는데 걸리는 시간 */
            }
        })

        hole.appendChild(img)
        hole.appendChild(span)

        timer = setTimeout  (() => { /* 두더지를 때리지 못하고 들어갔을때 */
        hole_out[i]=0
            mole_move('rise','down',i)
            run(i)
        }, rand(100000,500000))

    }, rand(1000,2000))

}
game_start()

for(var i=0;i<holes.length;i++){ /* 한번만 실행함 */
    if(hole_out[i]===0)run(i)
}

window.addEventListener('mousemove', e => {
    cursor.style.top = e.pageY  - cursor.clientHeight/2 + 'px'
    cursor.style.left = e.pageX - cursor.clientWidth/2 + 'px'


})
window.addEventListener('mousedown', () => {
    cursor.classList.add('active')
})
window.addEventListener('mouseup', () => {
    cursor.classList.remove('active')
    
})

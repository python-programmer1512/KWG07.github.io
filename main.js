const modal = document.getElementById("modal")
const gameover_show_re = document.getElementById("gameover")
const gs = document.getElementById("game-setting")
const submit_category = document.getElementById("submit-category")
const submit_category_check = document.getElementById("submit-category_check")
const check_school_number=document.querySelectorAll('.content span')[2];
const sp = document.getElementById("start-page")
const check_imoji = document.getElementById("submit-schoolnumber")
const check_imoji_check = document.getElementById("submit-schoolnumber_check")
const check_category=document.querySelectorAll('.content span')[5];
const cursor = document.querySelector('.cursor')
const holes = [...document.querySelectorAll('.mole')]
const hole_out = new Array(holes.length).fill(0);
const mole_ans = new Array(holes.length).fill(0);
const scoreEl = document.querySelector('.score span')
const final_score = document.querySelector('.final-score span')
const TIMER=document.querySelector('.timer span');
const PB=document.querySelector('.problem span');
const game_start_button = document.getElementById("start-img-button")
let score = 0
let answer = 0 
let percent=[1,holes.length]
let last_percent=[1,holes.length]
let user_School_Number = 0
let game_mode = 0
let start_time = 0
let game_finish = 0
let last_game = 0
let category = 0
let category_list = ["로그","지수","수열"]
let before_start_setting = [0,0] // 학번 입력, 게임 유형 선택
let game_play_time = 60

/*
upload={
            "main_category": "",
            "correct_pb_cnt": 4440,
            "wrong_pb_cnt": 3330,
            "score": 144231330,
            "user_name": "",
            "create_date": datetime.now(),
            "detail": [
                {
                "category": "1112222",
                "problem": "33334444",
                "problem_answer": "qqqqqwwww",
                "user_answers": "ddddzzzxss"
                }
            ]
            }


수열 문제 유형
1. 빈칸 o 3점
2. 공차 구하기 o 3점
3. n번째 항 구하기  5점      n번째 항 : an, 1번째 항 : a1

지수함수

로그함수


*/

function ord(v){
    return String.fromCharCode(v)
}

function gamerule(){

}

function setting_game(){
    gs.style.display = "inline"
    sp.style.display = "none"
    check_imoji.style.display="none"
    check_imoji_check.style.display="none"
    submit_category.style.display="none"
    submit_category_check.style.display="none"
    check_category.textContent=""
    game_start_button.style.display="none"
    before_start_setting=[0,0]

}


function click2start(){
    console.log('school_number :',user_School_Number)
    //if(user_School_Number>=10000 && user_School_Number<=99999){
        check_imoji.style.display="inline"
        check_imoji_check.style.display="inline"
        check_school_number.textContent = "학번 :"+user_School_Number
        before_start_setting[0]=1

    //}else{ // 조건 만족 안하면 inline -> none}
}
function set_category(input_category){
    if(category_list.includes(String(input_category))){
        category=input_category
        submit_category.style.display="inline"
        submit_category_check.style.display="inline"
        check_category.textContent = "유형 : " + category
        before_start_setting[1]=1
        if(before_start_setting[0]==1 && before_start_setting[1]==1){
            game_start_button.style.display="inline"
        }
    }else{
        alert('올바르지 않은 카테고리')
    }

}

function school_number(e){ // value + ord(keyCode) : 입력한 숫자
    if(e.keyCode === 13){ //13 이 엔터 입력
        console.log('school_number :',user_School_Number)
        //if(user_School_Number>=10000 && user_School_Number<=99999){
            check_imoji.style.display="inline"
            check_school_number·textContent = "학번 :"+user_School_Number
            before_start_setting[0]=1
            if(before_start_setting[0]==1 && before_start_setting[1]==1){
                game_start_button.style.display="inline"
            }
            
            
        //}
        
    }else{
        user_School_Number = document.getElementById("school_number").value + ord(e.keyCode);
    }
}

function min(a,b){
    if(a>b)return b
    else return a
}
function max(a,b){
    if(a<b)return b
    else return a
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function new_pb(){

    /*
    수열 문제 유형
    1. 빈칸 o 3점
    2. 공차 구하기 o 3점
    3. n번째 항 구하기  5점      n번째 항 : an, 1번째 항 : a1

    지수함수

    로그함수
    
    
    */
    let problem;
    if(category==="수열"){
        let a_1 = rand(2,5)
        let number_cnt=rand(3,6)
        let rdm=rand(1,3)
        if(rdm==1){
            /*공차 or 공비 구하기 */
            if(rand(1,2)==1){
                /*등비 */
                let r=rand(-5,5)
            }else{
                /*등차 */
                let d=rand(-5,5)
            }
        }else if(rdm==2){
            /*빈칸 */
            let idx=rand(0,number_cnt-1)
            if(rand(1,2)==1){
                /*등비 */
                let r=rand(-5,5)
            }else{
                /*등차 */
                let d=rand(-5,5)
            }

        }else{
            /*n번째 항 */
            let N=rand(number_cnt+3,number_cnt+20)
            /*등차 */
            let d=rand(-5,5)
            
        }
    }
    answer=rand(1,10)
    PB.textContent = problem

}
function new_ans(i){
    let random=rand(1,percent[1])
    if(random<=percent[0]){
        /*answer*/
        last_percent[0]=percent[0]
        last_percent[1]=percent[1]
        last_percent[0]=min(last_percent[0],last_percent[1])
        percent[0]=1
        percent[1]++

        mole_ans[i]=answer
    }else{
        /*not answer*/
        let wrong_answer=0;
        if(rand(1,2)===1){
            wrong_answer=rand(answer-10,answer-1)
        }else{
            wrong_answer=rand(answer+1,answer+10)
        }
        mole_ans[i]=wrong_answer
        percent[0]++


    }

}


function game_start(){
    modal.style.display="none"
    gs.style.display="none"
    sp.style.display="none"
    gameover_show_re.style.display="none"
    score = 0
    answer = 0 
    game_finish = 0
    percent=[1,holes.length]
    last_percent=[1,holes.length]

    console.log('NEW GAME')
    console.log('mole cnt')
    console.log(holes.length)

    new_pb()
    for(var i=0;i<holes.length;i++){
        hole_out[i]=0
        if(last_game===0){
            const hole = holes[i]
            const img = document.createElement('img')
            img.classList.add('mole-down')
            img.src = './image/mole.png'
            img.id = 'mole-movement_'+i
            
            hole.appendChild(img)

            const span = document.createElement('span')
            let mole_text=document.createTextNode('')
            span.classList.add('text-down')
            span.appendChild(mole_text)
            span.id = 'text-movement_'+i

            hole.appendChild(span)
        }

        new_ans(i)
        mole_move('rise','down',i)



    }
    start_time = new Date().getTime()
    console.log('timeset')
    console.log(start_time)
    last_game=1
    
    let timer_value=0;
    TIMER.textContent = game_play_time
    timer_value= setInterval(()=>{
        TIMER.textContent = (game_play_time-((new Date().getTime() - start_time)/1000)).toFixed(2)
        if(TIMER.textContent<=0){
            if(game_finish===0){
                game_finish = 1
                console.log('Game Finish!!')
                TIMER.textContent=0.00
            }else{
                clearTimeout(timer_value)
                modal.style.display = ""
                gs.style.display = "none"
                sp.style.display = "none"
                gameover_show_re.style.display = "inline"
                final_score.textContent=score
            }
        }
    },1)
    for(var i=0;i<holes.length;i++){
        console.log('   ')
        console.log(hole_out[i])
        if(hole_out[i]===0)run(i)

    }

    
}

function retry_game(){
    modal.style.display = ""
    gs.style.display = "none"
    sp.style.display = "inline"
    gameover_show_re.style.display = "none"

}

function mole_move(A,B,i){ /* class : A -> B, down : {A:mole-rise,B:mole-down}, up : {A:mole-down,B:mole-rise} */
    const mole_before_class = "mole-"+A
    const mole_after_class = "mole-"+B

    const text_before_class = "text-"+A
    const text_after_class = "text-"+B

    const before_class = document.getElementById("mole-movement_"+i)
    console.log('rise or down')
    console.log(before_class)
    before_class.classList.replace(mole_before_class,mole_after_class)

    const before_class_text = document.getElementById("text-movement_"+i)
    before_class_text.classList.replace(text_before_class,text_after_class)


}


function run(i){
    console.log('move mole')
    console.log(i)
    const hole = holes[i]
    let timer = null
    let uptimer = null

    if(TIMER.textContent<=0){
        console.log('gameover')
        clearTimeout(uptimer)
        return
    }



    uptimer = setTimeout(() => { /* 두더지가 올라오기전 대기 시간 */
        const img = document.getElementsByTagName('img')[i]
        const span = document.getElementsByTagName('span')[i+1]
        console.log('finish delay')

        if(TIMER.textContent<=0){
            console.log('gameover1')
            clearTimeout(uptimer)
            return
        }
        
        /* 변경 */
        span.innerHTML = mole_ans[i];
        mole_move('down','rise',i)
        hole_out[i]=1

        img.addEventListener('click', () => { /* 두더지를 때렸을 때*/
            if(hole_out[i]===1){
                hole_out[i]=0
                if(mole_ans[i]===answer){
                    score += 3
                    new_pb()
                }else score -= 1
                scoreEl.textContent = score
                clearTimeout(timer)
                mole_move('rise','down',i)

                new_ans(i)

                run(i)
                return

            }
        })

        hole.appendChild(img)
        hole.appendChild(span)

        if(TIMER.textContent<=0){
            clearTimeout(timer)
            return
        }

        timer = setTimeout  (() => { /* 두더지를 때리지 못하고 들어갔을때 */
            hole_out[i]=0
            mole_move('rise','down',i)

            if(TIMER.textContent<=0){
                clearTimeout(timer)
                return
            }

            new_ans(i)
            run(i)
        }, rand(1000,2000))

    }, rand(1000,5000))

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

window.addEventListener('touchstart', (e) => {
    console.log("touchstart!!!")
    this.touches = e.changedTouches;
    cursor.style.top = this.touches[0].pageY  - cursor.clientHeight/2 + 'px'
    cursor.style.left = this.touches[0].pageX - cursor.clientWidth/2 + 'px'
    cursor.classList.add('active-touch')
})
window.addEventListener('touchend', (e) => {
    console.log("touchend!!!")
    this.touches = e.changedTouches;
    cursor.style.top = this.touches[0].pageY  - cursor.clientHeight/2 + 'px'
    cursor.style.left = this.touches[0].pageX - cursor.clientWidth/2 + 'px'
    cursor.classList.remove('active-touch')
    
})
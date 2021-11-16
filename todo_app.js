const home_page_display = localStorage.getItem("home_page_display");
const todo_page_display = localStorage.getItem("todo_page_display");
let fullname = localStorage.getItem("fullname");
let listname = localStorage.getItem("listname");
let todo_date = localStorage.getItem("date");
const todo_object = localStorage.getItem("todo_objects");
const home_page_div = document.querySelector('#home_page_container')
const listinfo_button_object = document.querySelector('#submit_list_info');
const todo_list_div = document.querySelector('#todo_list_container');
const show_todo_div = document.querySelector('#display_todos');
const todo_banner = document.querySelector('#todo_banner');
const todo_list = [];
const list_banner = document.querySelector('#list_banner');
const list_date_name = document.querySelector('#list_date_name');
const task_input_box = document.querySelector('#todo_task');
const add_task_button = document.querySelector('#add_task');
const task_ol = document.querySelector('#task_list')
const reset_todo = document.querySelector('#reset_todo');

let none = "none";
let block = "block";
const task = "";


if (todo_page_display){
    home_page_div.style.display = home_page_display;
    todo_list_div.style.display = todo_page_display;
    load_all_todos();
}
else{
    listinfo_button_object.addEventListener('click', function (e) {
        e.preventDefault();
        load_todo_firsttime();
    
    })
    function load_todo_firsttime()
    {   
        localStorage.clear();
        home_page_div.style.display = none;
        todo_list_div.style.display = block;
        localStorage.setItem("home_page_display",none);
        localStorage.setItem("todo_page_display",block);

        const inputs = document.querySelectorAll('input');
        console.log(inputs)
        for(i of inputs){
            key = i.id
            val = i.value
            localStorage.setItem(key, val)
        }
        fullname = localStorage.getItem("fullname");
        listname = localStorage.getItem("listname")
        todo_date = localStorage.getItem("date")
        list_banner.innerText = `Hi ${fullname}, lets make your todo list!`
        list_date_name.innerText = `Date: ${todo_date} | ListName: ${listname}`
        todo_banner.appendChild(list_banner);
        todo_banner.appendChild(list_date_name);
        }

    
    }


add_task_button.addEventListener('click', function(e){
    e.preventDefault();
    add_task();
   
})


task_ol.addEventListener("click", function(event) {
    
    const parsed_todo_list = JSON.parse(localStorage.todo_object);
    const targetTagToLowerCase = event.target.tagName.toLowerCase();
    if (targetTagToLowerCase === "li") {
      event.target.style.textDecoration = "line-through";
    } else if (targetTagToLowerCase === "button") {
      event.target.parentNode.remove();  
      const selected_todo = event.target.parentNode.innerText;
      const removable_task = selected_todo.replace("X", "");
        console.log(removable_task)
        for (const t of parsed_todo_list){
            parsed_todo_object = JSON.parse(t)
            console.log(parsed_todo_object.task)
            if(removable_task === parsed_todo_object.task){
                parsed_todo_list.pop(t);
            }
        }
        localStorage.setItem("todo_object",JSON.stringify(todo_list));

    }
    })

reset_todo.addEventListener('click',function(){
        
        home_page_div.style.display = block;
        todo_list_div.style.display = none;
        task_ol.innerText = "";
        localStorage.clear()
    })



function add_task(){
    const task = document.querySelector('#todo_task').value;
    if(task){
    const task_ol = document.querySelector('#task_list')
    let completion_status = false;

    const task_obj = {
        task: `${task}`,
        completion_status: `${completion_status}`
    }
    todo_list.push(JSON.stringify(task_obj));
    localStorage.setItem("todo_object",JSON.stringify(todo_list));
    console.log(localStorage)
    task_input_box.value = ""
    var task_li = document.createElement('li');
    var remove_task_button = document.createElement('button');
    var completion_box = document.createElement('input');
    completion_box.type = "checkbox"
    completion_box.checked = completion_status;
    remove_task_button.innerText = "X";
    remove_task_button.classList.add('remove_task');
    
    task_li.append(task);
    task_li.append(completion_box)
    task_li.append(remove_task_button)
    task_ol.append(task_li);}
    else{
        window.alert("No Tasks Were Entered!!");
    }
        
    }

function load_all_todos()
{   
    

    
    list_banner.innerText = `Hi ${fullname}, lets make your todo list!`
    list_date_name.innerText = `Date: ${todo_date} | ListName: ${listname}`
    
    const parsed_todo_list = JSON.parse(localStorage.todo_object);
    todo_banner.appendChild(list_banner);
    todo_banner.appendChild(list_date_name);
    for (const t of parsed_todo_list){
        
        parsed_todo_object = JSON.parse(t)
        console.log(parsed_todo_object);
        const task = parsed_todo_object.task;
        const completion_status = parsed_todo_object.completion_status;
        if (completion_status === true){
            var completion_box = document.createElement('input');
        completion_box.type = "checkbox"
        completion_box.checked = completion_status
        }
        else{
            var completion_box = document.createElement('input');
        completion_box.type = "checkbox"
        completion_box.checked = completion_status
        }

        var task_li = document.createElement('li');
        var remove_task_button = document.createElement('button');
        remove_task_button.innerText = "X";
        remove_task_button.classList.add('remove_task');
        
        task_li.append(task);
        task_li.append(completion_box)
        task_li.append(remove_task_button)
        task_ol.append(task_li);
    }
   
    
    
    
    
    
    
}


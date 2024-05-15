PennController.ResetPrefix(null); // Shorten command names (keep this line here))

// DebugOff()   // Uncomment this line only when you are 100% done designing your experiment


//showProgressBar =false //Uncomment this line if you want to hide the progress bar 


// First show consent, instructions, then practice & experiment trials, send results and show end screen
Sequence("consent", "instructions", followEachWith("sep","practice"), "prepare", randomize(followEachWith("sep","exp")), "demo", SendResults(), "end")

//add running order
Header(
  // ... code to be run before every single trial
  newVar("runningOrder", 0).global().set( v=>v+1 )
)
.log( "runningOrder" , getVar("runningOrder") )

//Consent //to be changed
newTrial ( "consent" ,
    defaultText
        .print()
    ,
    newHtml("consent", "consent.html")
     .print()
    ,

    newButton("<p>我已阅读实验知情同意书，并且同意参与本次实验。")
        .center()
        .print()
        .wait()
)
;

newTrial("instructions",
    defaultText
        .css({"font-size": "large"}) 
        .center()
        .print()
    ,
    newText("instructions-1", "欢迎参与本实验！")
    ,
    newText("instructions-2", "<p>在本实验中，您需要逐词阅读一些句子。 </p>")
    ,
    newText("instructions-3", "<p><b>但是，在每个词的位置上，您都会看到一个正确的词和一个错误的词（干扰项），您需要在键盘上按 “E”（左边选项） 键或 “I” （右边选项）键选择正确的词才能继续。</b></p>")
    ,
    newText("instructions-4", "<p><b>您需要尽可能快速且准确的地完成选择。</b></p>")
    ,
    newText("instructions-5", "<p> 如果您选择了错误的词（干扰项），您将看到一条信息提示您选择错误，并需要重新选择。 </p>")
    ,
    newText("instructions-6", "<p> <b>以下是一个示意图（例句：这是一个语言学实验。）：</b> </p>")
    ,
    newImage ("instructions-7","instruction.png")
    .size(500, 180)
    .print()
    .log()
    ,
    newText("instructions-8", "<p><b>完成一个句子后，您可能会看到一个与该句子相关的问题。您需要在键盘上按E（错误）或 I（正确）键回答问题。<b></p>")
    ,
    newText("instructions-9", "<p> 如果在完成一个句子后您没有看到相关问题，您需要按任意键进入下一个句子。</p>")
    ,
    newText("instructions-10", "<p><b>开始实验时，请将左手食指放在“E”键上，右手食指放在“I”键上。</b><p>")
    ,
    newText("instructions-", "<p><b>现在，我们先来做一些练习。</b><p>")
    ,
    newButton("wait", "点击开始练习。")
        .css({"font-size": "large"}) 
        .center()
        .print()
        .wait()
        
)

//practice
Template("practice.csv", row =>
    newTrial("practice",
        
        newController("Maze", {s: row.sentence, a: row.distractor, redo: true}) //turn on/off the redo mode
            .css("font-size", "1em")
            .center()
            .print()
,

getController("Maze")
            .log()      // Make sure to log the participant's progress
            .wait()
            .remove()
,
//If you have comprehension questions
         newText ("question", row.question)
            .center()
            .css({"font-size": "1.5em", "color": "green"}) 
            .cssContainer({"margin-bottom":"1em"})
            .bold()
            .print()
        ,
        
        (row.question? [
            
    newText("explain", "(请按键盘上的 E（错误）或 I（正确）键回答问题。)")
    .center()
    .italic()
    .cssContainer({"margin-bottom":"1em"})
    .print() 
    ,
        
    newKey("Q",  "EI")
    .log()
    .wait()
    ]
            : [
            null
        ])


))

//Separator
    newTrial("sep",
        newController("Separator",{transfer: "keypress"})
       .print()
       .wait()
       .remove()
)

//prepare
newTrial("prepare",
    defaultText
        .css({"font-size": "large"}) 
        .center()
        .print()
    ,
    newText("ready-1", "您已经完成了所有练习。")
    ,
    newText("ready-2", "<p><b> 您准备好进入正式实验了吗？ 请点击下方按钮继续。 </b></p>")
    ,
    newButton("ready-3", "开始正式实验")
        .center()
        .css({"font-size": "large"}) 
        .print()
        .wait()
)

//experimental
Template("practice.csv", row => //change it to your experimental stimuli
 newTrial("exp",
        
        newController("Maze", {s: row.sentence, a: row.distractor, redo: true}) //turn on/off the redo mode
            .css("font-size", "1em")
            .center()
            .print()
,

getController("Maze")
            .log()      // Make sure to log the participant's progress
            .wait()
            .remove()
,

//If you have comprehension questions
         newText ("question", row.question)
            .center()
            .css({"font-size": "1.5em", "color": "green"}) 
            .cssContainer({"margin-bottom":"1em"})
            .bold()
            .print()
        ,
        
        (row.question? [
            
    newText("explain", "(请按键盘上的 E（错误）或 I（正确）键回答问题。)")
    .center()
    .italic()
    .cssContainer({"margin-bottom":"1em"})
    .print() 
    ,
        
    newKey("Q",  "EI")
    .log()
    .wait()
    ]
            : [
            null
        ])
        
)

            .log("item", row.item)// Make sure to log everything you need
);



//demographic information
newTrial ("demo",
 newText("gender", "请选择您的（生理）性别：")
     .print() 
,

   newScale("gender","女","男")
    .labelsPosition("right")
    .center()
    .keys("E","I")
    .print()
    .wait()
,

    newText("age", "请输入您的年龄（整数）：")
     .print()
     ,
     
    newTextInput("age", "")
    .log()
    .print()
    .lines(0)
    .length(100)
    .size(40, 50)
    .center()
    .cssContainer({"margin-bottom":"1em"})
    .test.text(/\w+/)
,    
    newButton("<p>确定")
        .center()
        .print()
        .wait()


);

// Send results manually
SendResults("send");


// Final screen
newTrial("end",
    exitFullscreen()
    ,
    newText("感谢您的参与！您的完成码为: 2F0FEA79")
        .css({"font-size": "large"}) 
        .center()
        .print()
    ,
    // Wait on this page forever
    newButton().wait()
)

.setOption("countsForProgressBar",false)
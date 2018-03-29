/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        //Do something
		
    }
};

app.initialize();
var playerName;
var question_id=0;
var quiz;
var result=0;

$(document).ready(function(){
	$("#quiz").hide();
	$("#summary").hide();
	$("#intro").show();
	
	$("#start_btn").click(function(){
		playerName=$("#player_name").val();
		$("#intro").slideUp();
		$("#quiz").slideDown();
		//alert(playerName);
		console.log(playerName);
		showNextQuestion(question_id);
	});

	$("#answer_btn").click(function(){
		var a =$('input[name=answer]:checked').val();
		if (a==quiz.questions[question_id].proper_answer){
			result++;
			alert("Dobrze");
		}
		else {
			alert("Źle");
		}
		question_id++;
		if (question_id<quiz.questions.length){
			showNextQuestion(question_id);
		}
		else{
			console.log(result);
			console.log(quiz.questions.length);
			console.log(100*result);
			$("#quiz").slideUp();
			$("#summary").slideDown();
			result = 100*result/quiz.questions.length
			var summary="Summary <br> Wynik Testu:"
			+Number(result).toFixed(0)+"%";
			$("#summary").html(summary);
			
		}
	});	
	
	var json=$.getJSON("js/quiz.json", function(){
		console.log("JSON ok");
		quiz=json.responseJSON;
		//alert(JSON.stringify(json));
		//alert(quiz.name);
	}).fail(function(jqXHR, textStatus){
		console.log("ERROR");
		console.log("error " + textStatus);
        console.log("incoming Text " + jqXHR.responseText);
	});
	
});

function showNextQuestion(q_Id){
	var question = quiz.questions[q_Id];
	$("#name_label").html(playerName);
	var img = "<img src='img/"+question.img+"'></img>";
	$("#question_img_div").html(img);
	$("#question_txt_div").html(question.text);
	var ans="";
	for(i=0; i<question.ansers.length; i++){
		var q_ans="<input type='radio' name='answer' value='"+i+"' >"+question.ansers[i]+"</checkbox>";
		ans+=q_ans+"<br>";
	}
	$("#question_ans_div").html(ans);
}
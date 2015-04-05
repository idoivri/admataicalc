
Freedom = {};

Freedom.freedom = new SimpleSchema({
   הכנסות : {
      type: Number,
      min: 1,
      decimal: true,
      autoform: {
         step: "0.01"
      },
      label: "הכנסה חודשית"
   },
   הוצאות : {
      type: Number,
      min: 0,
      decimal: true,
      autoform: {
         step: "0.01"
      },
      label: "הוצאה חודשית"
  },
  תשואה_שנתית : {
      type: Number,
      min: 1,
      max:100,
      decimal: true,
      autoform: {
      step: "0.01"
    },
    label: "אחוז תשואה שנתית"
  },
  שיעור_משיכה_לאחר_הפרישה : {
      type: Number,
      min: 1,
      max:100,
      decimal: true,
      autoform: {
      step: "0.01"
    },
    label: "שיעור משיכה שנתית (באחוזים) לאחר פרישה"
  }
});

calcYears = function (income, expense, percentGrown, percentWithdraw) {
  return 100;
}


Template.calcForm.events({
    'click .btn-default': function(jQueryEvent, BlazeTemplateInstance){
        $(".result").html("");
    }

  }
) 

Template.calcForm.helpers(
  {
    freedomFormSchema: function() {
      return Freedom.freedom;
    },
    currentFieldValue: function() {
      if (!AutoForm.getFieldValue("הכנסות") || !AutoForm.getFieldValue("הוצאות")) {
        return "???";
      }
      else {
        return parseInt(AutoForm.getFieldValue("הכנסות")) - parseInt(AutoForm.getFieldValue("הוצאות"));
      }
    }
    /*,
    calcFinalValue: function() {
      console.log("got into calc Final Value!");
      if ( Match.test("הכנסות",AutoForm.getFieldValue("הכנסות")) &&
           Match.test("הוצאות",AutoForm.getFieldValue("הוצאות")) &&
           Match.test("תשואה_שנתית", AutoForm.getFieldValue("תשואה_שנתית")) &&
           Match.test("שיעור_משיכה_לאחר_הפרישה", AutoForm.getFieldValue("שיעור_משיכה_לאחר_הפרישה"))) {

        return calcYears(parseInt(AutoForm.getFieldValue("הכנסות")),parseInt(AutoForm.getFieldValue("הוצאות")),
              parseInt(AutoForm.getFieldValue("תשואה_שנתית")),parseInt(AutoForm.getFieldValue("שיעור_משיכה_לאחר_הפרישה")));

      }
      else {
        return "???";
      }
    }*/
  }
);


SimpleSchema.messages({minNumber: "[label] חייבת להיות לפחות [min]"});
SimpleSchema.messages({maxNumber: "[label] חייב להיות קטן מ-[max]"});

AutoForm.hooks({
  freedomFormSchema: {
    /*
    onSuccess: function(formType, result) {
      return calcResult(result);
    }*/
    onSubmit: function (insertDoc, updateDoc, currentDoc) { 
        this.event.preventDefault();
        console.log("called onSubmit");
        
        var D4 = insertDoc['הוצאות']/insertDoc['הכנסות'];
        var B3 = insertDoc['הכנסות'];
        var B7 = insertDoc['שיעור_משיכה_לאחר_הפרישה']/100;
        var B6 = insertDoc['תשואה_שנתית']/100;
        var B5 = insertDoc['הכנסות']-insertDoc['הוצאות'];
        var D5 = B5 / B3;


        //(LN((D4*(1/B7)*B6/D5)+1))/(LN(1+B6))
        var result = Math.log((D4*(1/B7)*B6/D5)+1)/(Math.log(1+B6));

        $(".result").html(result.toFixed(2));
        $(".result").css("color","blue");
        $(".result").css("font-weight","bold");
        this.done();
        //Template.autoForm.events.helpers.boom();
        /*if (customHandler(insertDoc)) {
          this.done();
        } else {
          this.done(new Error("Submission failed"));
        }
        return false;*/
      }
  }
});





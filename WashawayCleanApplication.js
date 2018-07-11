/**
 * The Washaway Clean application.
 * @class
 * @extends StackApplication
 * @param {DOMObject} container - The HTML object in which the application should place its views.
 */
var WashawayCleanApplication = function(container, toStyle) {
	StackApplication.call(this, container);
	
	let interviewees = <?php require(__DIR__ . "/interviewees.json"); ?>;
	
	let selectionView = new IntervieweeSelectionView({
		interviewees: interviewees,
		interviewTimeLimit: 300,
		interviewViewType: InterviewView,
		interviewViewOptions: {
			canInterrupt: false,
			idleAfter: 10,
			helpPrompt: "Help",
			helpContent: "<?php FileContents(__DIR__ . '/interviewHelp.html'); ?>"
		}
	});
	
	let introView = new VideoMessageView({
		videoURL: "videos/intro.mov",
		title: "Washaway Clean / Team Leader",
		continuePrompt: "Continue",
		nextView: selectionView,
		autoplay: true,
		transition: "slideLeft",
		canSkip: true
	});
	
	let instructionsView = new TextMessageView({
		content: "<?php FileContents(__DIR__ . '/instructions.html'); ?>",
		title: "Overview",
		continuePrompt: "Continue",
		nextView: introView,
		transition: "slideLeft"
	});
		
	let preIntroView = new VideoMessageView({
		videoURL: "videos/pre_intro.mp4",
		title: "Overview",
		continuePrompt: "Continue",
		nextView: instructionsView,
		autoplay: true,
		transition: "slideLeft",
		canSkip: true
	});
			
	window.style = new Styling();
	this.show(preIntroView);
}
extend(StackApplication, WashawayCleanApplication);
define(["Tone/core/Tone", "Tone/signal/Multiply", "Tone/signal/Signal"], function(Tone){

	"use strict";

	/**
	 *  @class Negate the incoming signal. i.e. an input signal of 10 will output -10
	 *
	 *  @constructor
	 *  @extends {Tone.SignalBase}
	 */
	Tone.Negate = function(){
		/**
		 *  negation is done by multiplying by -1
		 *  @type {Tone.Multiply}
		 *  @private
		 */
		this._multiply = this.input = this.output= new Tone.Multiply(-1);
	};

	Tone.extend(Tone.Negate, Tone.SignalBase);

	/**
	 *  clean up
	 */
	Tone.Negate.prototype.dispose = function(){
		Tone.prototype.dispose.call(this);
		this._multiply.dispose();
		this._multiply = null;
	}; 

	return Tone.Negate;
});
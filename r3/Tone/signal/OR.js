define(["Tone/core/Tone", "Tone/signal/GreaterThanZero"], function(Tone){

	"use strict";

	/**
	 *  @class OR the inputs together. True if at least one of the inputs is true. 
	 *         Simply an alias for Tone.GreaterThanZero
	 *
	 *  @extends {Tone.SignalBase}
	 *  @constructor
	 */
	Tone.OR = function(inputCount){

		inputCount = this.defaultArg(inputCount, 2);
		Tone.call(this, inputCount, 0);

		/**
		 *  a private summing node
		 *  @type {GainNode}
		 *  @private
		 */
		this._sum = this.context.createGain();

		/**
		 *  @type {Tone.Equal}
		 *  @private
		 */
		this._gtz = new Tone.GreaterThanZero();

		/**
		 *  the output
		 *  @type {Tone.Equal}
		 */
		this.output = this._gtz;

		//make each of the inputs an alias
		for (var i = 0; i < inputCount; i++){
			this.input[i] = this._sum;
		}
		this._sum.connect(this._gtz);
	};

	Tone.extend(Tone.OR, Tone.SignalBase);

	/**
	 *  clean up
	 */
	Tone.OR.prototype.dispose = function(){
		Tone.prototype.dispose.call(this);
		this._gtz.dispose();
		this._gtz = null;
		this._sum.disconnect();
		this._sum = null;
	};

	return Tone.OR;
});
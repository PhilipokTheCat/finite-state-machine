class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
      this.config = config;
      this.initial = this.config.initial;
      this.state = this.initial;
      this.undoStack = [];
      this.redoStack = [];
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
      return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
      if (state in this.config.states) {this.undoStack.push(this.state); this.state = state;  this.redoStack = [];}
      else throw new Error();
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
      if (this.config.states[this.state].transitions[event] != undefined)
      {
        this.undoStack.push(this.state);
        this.state = this.config.states[this.state].transitions[event];
        this.redoStack = [];
      }
      else throw new Error();
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
      this.state = this.initial;
      this.undoStack.push(this.state);
      this.redoStack = [];
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
      var arr = [];
      if (event == undefined)
      {
        for (var val in this.config['states']) arr.push(val);
      }
      else{
        for (var val in this.config['states']) if (event in this.config.states[val].transitions) arr.push(val);
      }
      return arr;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
      if (this.undoStack.length == 0) return false;
      else {
        this.redoStack.push(this.state);
        this.state = this.undoStack.pop();
        return true;
      }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
      if (this.redoStack.length == 0) return false;
      else {
        this.undoStack.push(this.state);
        this.state = this.redoStack.pop();
        return true;
      }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
      this.undoStack = [];
      this.redoStack = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/

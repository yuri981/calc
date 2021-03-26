const endsWithOperator = /[X/+‑]$/;
const operatori = /[X/+-]/;
const equal = /\=/;

// componente calc
class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formula: '',
      valoreCorrente: '0' };

    this.handleNumbers = this.handleNumbers.bind(this);
    this.handleOperators = this.handleOperators.bind(this);
    this.handleDecimal = this.handleDecimal.bind(this);
    this.handleAc = this.handleAc.bind(this);
    this.risultato = this.risultato.bind(this);
  }

  // funzioni
  handleNumbers(el) {
    const valore = el.target.value;
    if (!operatori.test(this.state.valoreCorrente)) {
      this.setState({
        formula: this.state.valoreCorrente == '0' && valore == '0' ?
        this.state.formula :
        this.state.formula + valore,
        valoreCorrente: this.state.valoreCorrente == '0' ?
        valore :
        this.state.valoreCorrente + valore });
    }
    if (operatori.test(this.state.valoreCorrente)) {
      this.setState({
        formula: this.state.formula + valore,
        valoreCorrente: valore });

    }
  }
  handleOperators(el) {
    const valore = el.target.value;

    if (valore == '-') {
      this.setState({
        formula: this.state.formula + valore,
        valoreCorrente: valore });

    } else
    if (equal.test(this.state.formula)) {
      this.setState({
        formula: this.state.formula.substring(this.state.formula.indexOf("=") + 1) + valore,
        valoreCorrente: '0' });

    } else
    if (this.state.formula[this.state.formula.length - 1] == "-") {
      this.setState({
        formula: this.state.formula.substring(0, this.state.formula.length - 2) + valore,
        valoreCorrente: valore });
    } else
    if (!endsWithOperator.test(this.state.formula)) {
      this.setState({
        formula: this.state.formula + valore,
        valoreCorrente: valore });

    } else
    if (endsWithOperator.test(this.state.formula)) {
      this.setState({
        formula: this.state.formula.replace(endsWithOperator, valore),
        valoreCorrente: valore });
    }
  }
  handleDecimal() {
    if (!this.state.valoreCorrente.includes('.')) {
      this.setState({
        formula: this.state.formula == '' ?
        "0." :
        this.state.formula + '.',
        valoreCorrente: this.state.valoreCorrente + '.' });

    }
    if (this.state.valoreCorrente.includes('.')) {
      this.setState({
        formula: this.state.formula,
        valoreCorrente: this.state.valoreCorrente });

    }
  }
  handleAc() {
    this.setState({
      formula: '',
      valoreCorrente: '0' });

  }
  risultato() {
    let espressione = this.state.formula;
    espressione = espressione.
    replace(/X/g, '*').
    replace(/‑/g, '-');
    let result = Math.round(1000000000000 * eval(espressione)) / 1000000000000;
    this.setState({
      formula: this.state.formula + '=' + result.toString(),
      valoreCorrente: result.toString() });

  }

  // render
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "calculator" }, /*#__PURE__*/
      React.createElement(Display, {
        formula: this.state.formula,
        valoreCorrente: this.state.valoreCorrente }), /*#__PURE__*/
      React.createElement(Buttons, {
        numbers: this.handleNumbers,
        operators: this.handleOperators,
        decimal: this.handleDecimal,
        ac: this.handleAc,
        result: this.risultato })));



  }}


class Display extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: "disp" }, /*#__PURE__*/
      React.createElement("p", { id: "formula" }, this.props.formula), /*#__PURE__*/
      React.createElement("p", { id: "display" }, this.props.valoreCorrente)));


  }}



class Buttons extends React.Component {
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "tot" }, /*#__PURE__*/
      React.createElement("div", { className: "num-pad" }, /*#__PURE__*/
      React.createElement("button", {
        className: "pad",
        id: "clear",
        value: "AC",
        onClick: this.props.ac }, "AC"), /*#__PURE__*/

      React.createElement("button", {
        className: "pad",
        id: "divide",
        value: "/",
        onClick: this.props.operators }, "/"), /*#__PURE__*/

      React.createElement("button", {
        className: "pad",
        id: "multiply",
        value: "X",
        onClick: this.props.operators }, "X"), /*#__PURE__*/

      React.createElement("button", {
        className: "pad",
        id: "seven",
        value: "7",
        onClick: this.props.numbers }, "7"), /*#__PURE__*/

      React.createElement("button", {
        className: "pad",
        id: "eight",
        value: "8",
        onClick: this.props.numbers }, "8"), /*#__PURE__*/

      React.createElement("button", {
        className: "pad",
        id: "nine",
        value: "9",
        onClick: this.props.numbers }, "9"), /*#__PURE__*/

      React.createElement("button", {
        className: "pad",
        id: "four",
        value: "4",
        onClick: this.props.numbers }, "4"), /*#__PURE__*/

      React.createElement("button", {
        className: "pad",
        id: "five",
        value: "5",
        onClick: this.props.numbers }, "5"), /*#__PURE__*/

      React.createElement("button", {
        className: "pad",
        id: "six",
        value: "6",
        onClick: this.props.numbers }, "6"), /*#__PURE__*/

      React.createElement("button", {
        className: "pad",
        id: "one",
        value: "1",
        onClick: this.props.numbers }, "1"), /*#__PURE__*/

      React.createElement("button", {
        className: "pad",
        id: "two",
        value: "2",
        onClick: this.props.numbers }, "2"), /*#__PURE__*/

      React.createElement("button", {
        className: "pad",
        id: "three",
        value: "3",
        onClick: this.props.numbers }, "3"), /*#__PURE__*/

      React.createElement("button", {
        className: "pad",
        id: "zero",
        value: "0",
        onClick: this.props.numbers }, "0"), /*#__PURE__*/

      React.createElement("button", {
        className: "pad",
        id: "decimal",
        value: ".",
        onClick: this.props.decimal }, ".")), /*#__PURE__*/


      React.createElement("div", { className: "min-plus-equal" }, /*#__PURE__*/
      React.createElement("button", {
        className: "pad",
        id: "subtract",
        value: "-",
        onClick: this.props.operators }, "-"), /*#__PURE__*/

      React.createElement("button", {
        className: "pad",
        id: "add",
        value: "+",
        onClick: this.props.operators }, "+"), /*#__PURE__*/

      React.createElement("button", {
        className: "pad",
        id: "equals",
        value: "=",
        onClick: this.props.result }, "="))));




  }}



ReactDOM.render( /*#__PURE__*/React.createElement(Calc, null), document.getElementById("app"));
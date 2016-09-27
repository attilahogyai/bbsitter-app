
import App from 'appkit/app';
function ifEval(script,options) {
    var result=eval(script);
    if (result) {
        return options.fn(this);
    }
    return options.inverse(this);
}

export { ifEval };

export default ifEval;




const davidRoute = (req, res) => {
    res.send('This is the Web frist page!');
};
const thomasRoute = (req,res) => {
    res.send('Thomas said Welcome!');
};
const FionRoute = (req,res) => {
    res.send('Fion said Hello!');
};

module.exports = {
    davidRoute,
    thomasRoute,
    FionRoute,
};
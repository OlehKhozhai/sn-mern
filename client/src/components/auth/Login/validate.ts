export default (values: any) => {
    const errors: any = {};

    if (values && !values.name) errors.name = "Name is require";
    console.log(errors, values);
    return errors;
};

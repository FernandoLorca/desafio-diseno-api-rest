export const handleErrors = code => {
  if (!code) {
    return {
      ok: false,
      code: 500,
      msg: 'Server error, unknown error',
    };
  }

  switch (code) {
    case '22P02':
      return {
        ok: false,
        status: 400,
        msg: 'Parameter format not valid',
      };

    case '400':
      return {
        ok: false,
        status: 404,
        msg: 'Data is missing',
      };

    case '404':
      return {
        ok: false,
        status: 404,
        msg: "Register don't exist",
      };

    default:
      return {
        ok: false,
        status: 500,
        msg: 'Server error, unknown error',
      };
  }
};

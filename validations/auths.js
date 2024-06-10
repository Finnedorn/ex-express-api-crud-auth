const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();


const registerChecker = {
    email: {
        in:["body"],
        notEmpty: {
            errorMessage: "Email è un campo obbligatorio.",
            bail: true,
        },
        isEmail: {
            errorMessage: "Email deve essere una mail.",
            bail: true,
        },
        custom: {
            options: async (mail) => {
                const mailToFind = await prisma.user.findFirst({
                  where: {
                    email: mail,
                  },
                });
                if (mailToFind) {
                  throw new Error("Questa Email è già stata registrata!");
                }
                return true;
            },
        }
    },
    name: {
        in:["body"],
        isString: {
            errorMessage: "Name deve essere una stringa",
            bail: true,
        },
    }, 
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Password è un campo obbligatorio.',
            bail: true
        },
        isString: {
            errorMessage: 'Password deve essere una stringa.',
            bail: true
        },
        isLength: {
            errorMessage: 'Password deve essere di almeno 8 caratteri',
            options: {min: 8}
        }
    }
};

const loginChecker = {
    email: {
        in:["body"],
        notEmpty: {
            errorMessage: "Email è un campo obbligatorio.",
            bail: true,
        },
        isEmail: {
            errorMessage: "Email deve essere una mail.",
            bail: true,
        },
    },
    password: {
        in: ["body"],
        notEmpty: {
            errorMessage: 'Password è un campo obbligatorio.',
            bail: true
        },
        isString: {
            errorMessage: 'Password deve essere una stringa.',
        }
    }
};

module.exports= {
    registerChecker,
    loginChecker
}
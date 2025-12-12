const PATH = `http://localhost:8000/api/v1`;
const HEADERS = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem("pos-accessToken")}`,
    },
};

export default {PATH, HEADERS}
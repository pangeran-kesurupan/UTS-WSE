const ok = (data, message = "success") => ({
  status: "success",
  message,
  data,
});

const fail = (message = "Bad Request", details = null) => ({
  status: "fail",
  message,
  ...(details ? { details } : {}),
});

module.exports = { ok, fail };

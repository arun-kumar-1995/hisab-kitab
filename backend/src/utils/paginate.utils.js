export const EncryptCursorId = (cursor) => {
  const encryptKey = process.env.ENCRYPTION_KEY + cursor;
  return Buffer.from(encryptKey).toString("base64");
};

export const DecryptCursorBuffer = (encryptedData) => {
  const decoded = Buffer.from(encryptedData, "base64").toString();
  return decoded.replace(process.env.ENCRYPTION_KEY, "");
};

export const Paginate = async (model, query) => {
  const page = parseInt(query.page) || 1;
  const perPage = parseInt(query.perPage) || 10;
  const direction = query.direction === "prev" ? "prev" : "next";

  let filter = {};

  if (page === 1 && direction === "next") filter;
  if (page === 1 && direction === "prev" && query.cursor)
    filter._id = { $gt: DecryptCursorBuffer(query.cursor) };

  if (page > 1 && query.cursor) {
    const cursor = DecryptCursorBuffer(query.cursor);
    filter._id = direction === "next" ? { $lt: cursor } : { $gt: cursor };
  }

  const sortOrder = direction === "next" ? -1 : 1;
  const total = await model.estimatedDocumentCount();

  const data = await model
    .find(filter)
    .sort({ _id: sortOrder })
    .limit(perPage)
    .lean();

  return {
    total,
    page,
    limit: perPage,
    pages: Math.ceil(total / perPage),
    nextCursor:
      data && data.length > 0
        ? EncryptCursorId(data[data.length - 1]._id)
        : null,
    prevCursor: data && data.length > 0 ? EncryptCursorId(data[0]._id) : null,
    data: direction === "next" ? data : data.reverse(),
  };
};

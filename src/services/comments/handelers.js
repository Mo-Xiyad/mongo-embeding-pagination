import PostModel from "../../models/postShema.js";
import createHttpError from "http-errors";

const getComments = async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.postId);

    if (post) {
      res.send(post.comments);
    } else {
      next(
        createHttpError(404, `Post with id ${req.params.postId} not found!`)
      );
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const createComments = async (req, res, next) => {
  try {
    // 1. Find the post in the Posts Collection by id
    const postToCommet = await PostModel.findById(req.params.postId);

    if (postToCommet) {
      const postToInsert = {
        ...req.body,
      };
      const updatePostWithComment = await PostModel.findByIdAndUpdate(
        req.params.postId,
        { $push: { comments: postToInsert } },
        { new: true }
      );

      res.send(updatePostWithComment);
    } else {
      next(
        createHttpError(404, `Post with id ${req.params.postId} not found!`)
      );
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const getCommentsById = async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.postId);
    if (post) {
      const commentWithId = post.comments.find(
        (comment) => comment._id.toString() === req.params.commentId
      );
      if (commentWithId) {
        res.send(commentWithId);
      } else {
        next(
          createHttpError(
            404,
            `Comment with id ${req.params.commentId} not found!`
          )
        );
      }
    } else {
      next(
        createHttpError(404, `Post with id ${req.params.postId} not found!`)
      );
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const updateCommentsById = async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.postId);
    if (post) {
      const commentIndex = post.comments.findIndex(
        (comment) => comment._id.toString() === req.params.commentId
      );

      if (commentIndex !== -1) {
        post.comments[commentIndex] = {
          ...post.comments[commentIndex].toObject(),
          ...req.body,
        };

        await post.save();
        res.status(200).send(post.comments[commentIndex]);
      } else {
        next(
          createHttpError(404, `Post with id ${req.params.postId} not found!`)
        );
      }
    } else {
      next(
        createHttpError(404, `Post with id ${req.params.postId} not found!`)
      );
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const deleteCommentsById = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const handler = {
  getComments,
  createComments,
  getCommentsById,
  updateCommentsById,
  deleteCommentsById,
};
export default handler;

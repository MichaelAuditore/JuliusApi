import mongoose from 'mongoose'

const postSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      default: '',
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    content: {
      type: String,
      required: true,
      trim: true
    },
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true
    },
    settings: {
      notifications: {
        type: Boolean,
        required: true,
        default: true
      },
      compactMode: {
        type: Boolean,
        required: true,
        default: false
      }
    }
  },
  { timestamps: true }
)

export const Post = mongoose.model('posts', postSchema)

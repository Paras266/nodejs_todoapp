import erros from "../middleware/error.js";
import Task from "../models/task.js";


export const newtask = async (req, res, next) => {
   const { title, description } = req.body;
   await Task.create({
      title,
      description,
      user: req.user,
   })

   res.status(201).json({
      success: true,
      message: "Task Was Added"
   })
}

export const getmytask = async (req, res, next) => {
   try {
      let userid = req.user._id;
      let tasks = await Task.find({ user: userid })

      res.status(200).json({
         message: true,
         tasks
      })
   } catch (error) {
      next(error)
   }
}


export const updatetask = async (req, res, next) => {

   try {
      let task = await Task.findById(req.params.id)

      if (!task) return next(new erros("Invalid Id", 404));

      task.iscreated = !task.iscreated;
      await task.save();
      res.status(200).json({
         success: true,
         message: "Updated"
      })

   } catch (error) {
      next(error)
   }
}


export const deletetask = async (req, res, next) => {
   try {
      let task = await Task.findById(req.params.id)

      if (!task) return next(new erros("Invalid Id", 404));

      await task.deleteOne();
      res.status(200).json({
         success: true,
         message: "Deleted"
      })
   } catch (error) {
      next(error)
   }
}
import { Request, Response } from "express";
import { ZodError } from "zod";

export const errorHandler = (
  controller: (req: Request, res: Response) => void
) => {
  return async (req: Request, res: Response) => {
    try {
      await controller(req, res);
    } catch (error) {
      switch (true) {
        case error instanceof ZodError: {
          const errorString = error.issues
            .map((issue) => issue.message)
            .join(", ");

          res.status(400).json({ success: false, error: errorString });

          return;
        }
        default: {
          res
            .status(400)
            .json({
              success: false,
              error: (error as Error)?.message ?? "Something went wrong",
            });
        }
      }
    }
  };
};

import { Router } from "express";
import { getUserByIdController, updateUserProfileController, deleteUserController } from "./user.controller";
import { protect, authorize } from "../../middleware/auth.middlerware";
import { Role } from "@prisma/client";

const router = Router()

router.use(protect)

router.get('/:id', authorize([Role.ADMIN]), getUserByIdController)

router.patch('/:id', authorize([Role.ADMIN]), updateUserProfileController)

router.delete('/:id', authorize([Role.ADMIN]), deleteUserController)

export default router;
import { connectToDB } from "@/model/db";
import NotificationModel from "@/model/notification.model";
import { NextRequest, NextResponse } from "next/server";

// GET /api/notifications
export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const notifications = await NotificationModel.find({})
      .sort({
        createdAt: -1,
      })
      .lean()
      .exec();

    return NextResponse.json(
      {
        status: true,
        data: notifications,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      {
        message: "Error fetching notifications",
        error: error.message,
        status: false,
      },
      {
        status: 500,
      }
    );
  }
};

// POST /api/notifications
export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    const formData = await req.json();

    const notification = new NotificationModel(formData);

    await notification.save();

    return NextResponse.json(
      {
        status: true,
        data: notification,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error creating notification:", error);
    return NextResponse.json(
      {
        message: "Error creating notification",
        error: error.message,
        status: false,
      },
      {
        status: 500,
      }
    );
  }
};

// PATCH /api/notifications (mark as read)
export const PATCH = async (req: NextRequest) => {
  try {
    await connectToDB();

    const notifications = await NotificationModel.updateMany(
      {},
      { isRead: true }
    );

    if (!notifications.acknowledged) {
      return NextResponse.json(
        {
          message: "Error marking notifications as read",
          status: false,
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        status: true,
        data: null,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error marking notification as read:", error);
    return NextResponse.json(
      {
        message: "Error marking notification as read",
        error: error.message,
        status: false,
      },
      {
        status: 500,
      }
    );
  }
};

// DELETE /api/notifications
export const DELETE = async (req: NextRequest) => {
  try {
    await connectToDB();

    const { id } = await req.json();

    const notification = await NotificationModel.findOneAndDelete({ _id: id })
      .lean()
      .exec();

    if (!notification) {
      return NextResponse.json(
        {
          message: "Notification not found",
          status: false,
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        status: true,
        data: null,
      },
      {
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Error deleting notification:", error);
    return NextResponse.json(
      {
        message: "Error deleting notification",
        error: error.message,
        status: false,
      },
      {
        status: 500,
      }
    );
  }
};

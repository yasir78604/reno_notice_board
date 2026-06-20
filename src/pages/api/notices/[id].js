import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  const { id } = req.query;

  // GET SINGLE NOTICE
  if (req.method === "GET") {
    try {
      const notice = await prisma.notice.findUnique({
        where: {
          id: id,
        },
      });

      return res.status(200).json(notice);
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching notice",
      });
    }
  }

  // UPDATE NOTICE
  if (req.method === "PUT") {
    try {
      const { title, body, category, priority, publishDate } = req.body;

      const updatedNotice = await prisma.notice.update({
        where: {
          id: id,
        },
        data: {
          title,
          body,
          category,
          priority,
          publishDate: new Date(publishDate),
        },
      });

      return res.status(200).json(updatedNotice);
    } catch (error) {
      return res.status(500).json({
        message: "Error updating notice",
      });
    }
  }

  // DELETE NOTICE
  if (req.method === "DELETE") {
    try {
      await prisma.notice.delete({
        where: {
          id: id,
        },
      });

      return res.status(200).json({
        message: "Notice deleted successfully",
      });

    } catch (error) {
      return res.status(500).json({
        message: "Error deleting notice",
      });
    }
  }

  return res.status(405).json({
    message: "Method not allowed",
  });
}
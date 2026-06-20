import prisma from "../../../lib/prisma";

export default async function handler(req, res) {
  // GET all notices
  if (req.method === "GET") {
    try {
      const notices = await prisma.notice.findMany({
        orderBy: [
          {
            priority: "desc",
          },
          {
            publishDate: "desc",
          },
        ],
      });

      return res.status(200).json(notices);
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching notices",
      });
    }
  }

  // POST create notice
  if (req.method === "POST") {
    try {
      const { title, body, category, priority, publishDate } = req.body;

      // server side validation
      if (!title || !body || !publishDate) {
        return res.status(400).json({
          message: "Missing required fields",
        });
      }

      const notice = await prisma.notice.create({
        data: {
          title,
          body,
          category,
          priority,
          publishDate: new Date(publishDate),
        },
      });

      return res.status(201).json(notice);
    } catch (error) {
      return res.status(500).json({
        message: "Error creating notice",
      });
    }
  }

  return res.status(405).json({
    message: "Method not allowed",
  });
}
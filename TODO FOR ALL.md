Solflo/Soltrack

1\. Logos -> Approved the AI Camera and awaiting on the others approval

2\. Do advetrans updates => Done and in progress missing the one for Aaron, need to help Vik display it on the Dashboard

4\. Do updates in all apps => EPS need to be reviewed on play store. Advetrans need to redefine and make it all work

5\. Error reporting breakdown => On advetrans need to sort that out,

6\. Will start Premier on the 23 until 25 Sunday and give updates

7\. Need to revisit the One store app for all companies.



Urgently

***1. Need to fix the maysene subcontractor thing and add a printable thing => Done the changes => DONE***

**2. Push eps new app to apple store -> Let me try now** 

**3. Nedbank do the videos and get suggestions**

4\. DO the power app mock up

5\. Debug favorsea, do the escalations and get confirmation on it



Monday stuff on above 3/5 task did 





Nedbank

1\. Finish the automate course => Done passed with 95%

2\. Do Camunda => Far but not far

3\. Do the course Thabo sent => In progress

4\. Review the documents

5\. Do the power app practice

6\. finish All assessments for compliance

7\. Make sure i claim more certification

8\. Do python add to manage the task a team have like Jira sort of and be able to send the list to people in Jira to see all allocated task

9\. Challenge to Jared => Be first for Camunda and also make sure we learn Blue Prism

10\. Come up with ideas.





Cybersec-Clinique

1\. Do the send back - Done just need to test, need to define the statuses and use them to roll back and add right styling

2\. Do escalation -  add 5 days after every 25/30 of every month 3 cases => In progress

3\. Move the view details button to right for everyone

4\. Need to confirm with miss mania on this.





Personal 

1\. link my GoDaddy stuff

2\. Improve my python coding skills and move from being amateur and all.







-> Choosing any trip, 



All the below is fixed.

Issues the approved by CEO goes back to finance\_docs uploaded instead of saying escalated

Issue if that the roll back for other not going back to innocent and it auto approves||||||||||| issue auto approve for Mr. innocent and no reason of that



&nbsp;	Challenge need help with need to know how would they know it was sent back to them

&nbsp;	Notifications maybe do color edit on them highlight in red that page have notification icon also or something





status and color make color 

















































// Send back request to previous editor

// app.post("/external\_request/:id/sendback", verifyUser, async (req, res) => {

//   console.log("=======> ENDPOINT HIT <=======");

//   console.log("Endpoint hit - Request ID:", req.params.id);

//   console.log("equest body:", req.body);

//   console.log("Umnini ===> User:", req.user?.username, "Role:", req.user?.role);



//   const { id } = req.params;

//   const { reason\_category, reason\_details } = req.body;

//   const { username, role } = req.user;



//   if (!username || !role) {

//     console.error("❌ \[SENDBACK] Missing user information");

//     return res.status(401).json({

//       success: false,

//       message: "User authentication required",

//     });

//   }



//   const client = await pool.connect();

//   try {

//     await client.query("BEGIN");

//     // Get the current request from the db

//     const requestResult = await client.query(

//       `SELECT \* FROM external\_request WHERE id = $1`,

//       \[id]

//     );



//     if (requestResult.rows.length === 0) {

//       console.error("Request not found in the database:", id);

//       await client.query("ROLLBACK");

//       return res

//         .status(404)

//         .json({ success: false, message: "Request not found" });

//     }



//     const request = requestResult.rows\[0];

//     const currentStatus = request.status;

//     console.log("The current request status is:", currentStatus);



//     // Validate reason, ukuze sibone ukuthi sebenza ngendlela okumele

//     if (!reason\_category || !reason\_details) {

//       console.error("Missing reason category or details");

//       await client.query("ROLLBACK");

//       return res.status(400).json({

//         success: false,

//         message: "Reason category and details are required",

//       });

//     }

//     console.log("Reason validated - Category:", reason\_category);



//     // Get the previous status from event logs (most recent status change before current) siyibuyisela emumva ngestatus cheif

//     const previousStatusResult = await client.query(

//       `SELECT old\_status, performed\_by, created\_at 

//        FROM external\_request\_event\_logs 

//        WHERE external\_request\_id = $1 

//          AND event\_type = 'status\_change' 

//          AND new\_status = $2

//        ORDER BY created\_at DESC 

//        LIMIT 1`,

//       \[id, currentStatus]

//     );



//     if (previousStatusResult.rows.length === 0) {

//       console.error("No previous status found in event logs");

//       console.error("Current status is:", currentStatus, "Request ID is:", id);

//       await client.query("ROLLBACK");

//       return res.status(400).json({

//         success: false,

//         message: "Cannot send back: No previous status found in history",

//       });

//     }



//     const previousStatus = previousStatusResult.rows\[0].old\_status;

//     const previousEditor = previousStatusResult.rows\[0].performed\_by;

//     console.log("Previous status is:", previousStatus, "Previous editor is:", previousEditor);



//     // Get documents uploaded by current user's role

//     if (!username) {

//       console.error("User not found in the database:", username);

//       await client.query("ROLLBACK");

//       return res.status(404).json({ success: false, message: "User not found" });

//     }

//     const documentsResult = await client.query(

//       `SELECT id, file\_url, doc\_type FROM request\_documents 

//        WHERE request\_id = $1 AND uploaded\_by = $2`,

//       \[id, username]

//     );



//     const deletedFiles = documentsResult.rows.map((doc) => ({

//       id: doc.id,

//       file\_url: doc.file\_url,

//       doc\_type: doc.doc\_type,

//     }));



//     // Delete files uploaded by current user

//     if (documentsResult.rows.length > 0) {

//       await client.query(

//         `DELETE FROM request\_documents 

//          WHERE request\_id = $1 AND uploaded\_by = $2`,

//         \[id, username]

//       );

//     }



//     // Get amount history to revert if current user updated it

//     const amountHistoryResult = await client.query(

//       `SELECT amount, updated\_by, updated\_at 

//        FROM external\_request\_amount\_history 

//        WHERE request\_id = $1 

//        ORDER BY updated\_at DESC 

//        LIMIT 2`,

//       \[id]

//     );



//     let revertedAmount = null;

//     if (amountHistoryResult.rows.length >= 2) {

//       const latestAmount = amountHistoryResult.rows\[0];

//       const previousAmount = amountHistoryResult.rows\[1];



//       // If latest amount was updated by current user, revert to previous

//       if (latestAmount.updated\_by === username) {

//         revertedAmount = latestAmount.amount;

//         await client.query(

//           `UPDATE external\_request SET amount = $1, updated\_at = NOW() WHERE id = $2`,

//           \[previousAmount.amount, id]

//         );

//       }

//     }



//     // Update request status to previous status

//     await client.query(

//       `UPDATE external\_request 

//        SET status = $1, updated\_at = NOW() 

//        WHERE id = $2`,

//       \[previousStatus, id]

//     );



//     // Log the send-back action

//     await client.query(

//       `INSERT INTO external\_request\_sendback\_history 

//        (external\_request\_id, sent\_back\_by, sent\_back\_to, reason\_category, reason\_details, 

//         previous\_status, current\_status, reverted\_amount, deleted\_files, created\_at)

//        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())`,

//       \[

//         id,

//         username,

//         previousEditor,

//         reason\_category,

//         reason\_details,

//         previousStatus,

//         currentStatus,

//         revertedAmount,

//         JSON.stringify(deletedFiles),

//       ]

//     );



//     // Log the status change event for history purposes mfowethu ngoba meke kwalahleka ziyashuba

//     await client.query(

//       `INSERT INTO external\_request\_event\_logs 

//        (external\_request\_id, event\_type, event\_description, performed\_by, old\_status, new\_status, created\_at)

//        VALUES ($1, 'sendback', $2, $3, $4, $5, NOW())`,

//       \[

//         id,

//         `Request sent back from ${currentStatus} to ${previousStatus}. Reason: ${reason\_category} - ${reason\_details}`,

//         username,

//         currentStatus,

//         previousStatus,

//       ]

//     );



//     await client.query("COMMIT");

//     console.log("Transaction committed successfully");



//     // Get updated request

//     const updatedRequestResult = await client.query(

//       `SELECT \* FROM external\_request WHERE id = $1`,

//       \[id]

//     );



//     console.log("Request sent back successfully");

//     console.log("Deleted files:", deletedFiles.length);

//     console.log("Amount reverted:", revertedAmount !== null);



//     res.json({

//       success: true,

//       data: {

//         ...updatedRequestResult.rows\[0],

//         requestNumber: updatedRequestResult.rows\[0].request\_number,

//         requestedBy: updatedRequestResult.rows\[0].requested\_by,

//         createdAt: updatedRequestResult.rows\[0].created\_at,

//         updatedAt: updatedRequestResult.rows\[0].updated\_at,

//       },

//       message: `Request sent back to ${previousEditor}. Status reverted to ${previousStatus}.`,

//       deletedFilesCount: deletedFiles.length,

//       amountReverted: revertedAmount !== null,

//     });

//   } catch (error) {

//     await client.query("ROLLBACK");

//     console.error("Error sending back request:", error);

//     console.error("Error stack:", error.stack);

//     console.error("Request ID:", id);

//     res.status(500).json({

//       success: false,

//       message: "Failed to send back request: " + error.message,

//       error: process.env.NODE\_ENV === 'development' ? error.stack : undefined,

//     });

//   } finally {

//     client.release();

//   }

// });



// Enhanced send back endpoint with flow-aware rollback logic

app.post("/external\_request/:id/sendback", verifyUser, async (req, res) => {

&nbsp; console.log("=======> ENHANCED SENDBACK ENDPOINT HIT <=======");

&nbsp; console.log("Request ID:", req.params.id);

&nbsp; console.log("Request body:", req.body);

&nbsp; console.log("User:", req.user?.username, "Role:", req.user?.role);



&nbsp; const { id } = req.params;

&nbsp; const { reason\_category, reason\_details } = req.body;

&nbsp; const { username, role } = req.user;



&nbsp; if (!username || !role) {

&nbsp;   return res.status(401).json({

&nbsp;     success: false,

&nbsp;     message: "User authentication required",

&nbsp;   });

&nbsp; }



&nbsp; const client = await pool.connect();

&nbsp; try {

&nbsp;   await client.query("BEGIN");



&nbsp;   // Get current request

&nbsp;   const requestResult = await client.query(

&nbsp;     `SELECT \* FROM external\_request WHERE id = $1 FOR UPDATE`,

&nbsp;     \[id]

&nbsp;   );



&nbsp;   if (requestResult.rows.length === 0) {

&nbsp;     await client.query("ROLLBACK");

&nbsp;     return res.status(404).json({ success: false, message: "Request not found" });

&nbsp;   }



&nbsp;   const request = requestResult.rows\[0];

&nbsp;   const currentStatus = request.status;

&nbsp;   console.log("Current status:", currentStatus);



&nbsp;   if (!reason\_category || !reason\_details?.trim()) {

&nbsp;     await client.query("ROLLBACK");

&nbsp;     return res.status(400).json({

&nbsp;       success: false,

&nbsp;       message: "Reason category and details are required",

&nbsp;     });

&nbsp;   }



&nbsp;   // ✅ FIXED FLOW LOGIC WITH PROPER BRACES

&nbsp;   let previousStatus, previousEditor;



&nbsp;   if (currentStatus === "FINANCE\_DOCS\_UPLOADED") {

&nbsp;     previousStatus = "PROCUREMENT\_DOCS\_UPLOADED";

&nbsp;   } else if (currentStatus === "PROCUREMENT\_DOCS\_UPLOADED") {

&nbsp;     previousStatus = "APPROVED\_BY\_HOD";

&nbsp;   } else if (currentStatus === "APPROVED\_BY\_HOD") {

&nbsp;     previousStatus = "PENDING\_ADMIN\_HEAD";

&nbsp;   } else if (currentStatus === "PROCUREMENT\_APPROVED") {

&nbsp;     previousStatus = "FINANCE\_DOCS\_UPLOADED";

&nbsp;   } else if (currentStatus === "APPROVED\_BY\_CEO") {

&nbsp;     previousStatus = "ESCALATED";

&nbsp;   } else if (currentStatus === "ESCALATED" || currentStatus === "Escalated" || currentStatus === "PENDING\_CEO\_REVIEW") {

&nbsp;     previousStatus = "FINANCE\_DOCS\_UPLOADED"; // ✅ YOUR DESIRED FLOW

&nbsp;   } else {

&nbsp;     // Generic lookup

&nbsp;     const prevResult = await client.query(

&nbsp;       `SELECT old\_status, performed\_by FROM external\_request\_event\_logs 

&nbsp;        WHERE external\_request\_id = $1 AND event\_type = 'status\_change' 

&nbsp;        AND new\_status = $2 ORDER BY created\_at DESC LIMIT 1`,

&nbsp;       \[id, currentStatus]

&nbsp;     );

&nbsp;     if (prevResult.rows.length === 0) {

&nbsp;       throw new Error(`No previous status found for ${currentStatus}`);

&nbsp;     }

&nbsp;     previousStatus = prevResult.rows\[0].old\_status;

&nbsp;     previousEditor = prevResult.rows\[0].performed\_by;

&nbsp;     console.log("Using generic lookup:", previousStatus);

&nbsp;   }



&nbsp;   // ✅ Get previous editor from logs

&nbsp;   const editorResult = await client.query(

&nbsp;     `SELECT performed\_by FROM external\_request\_event\_logs 

&nbsp;      WHERE external\_request\_id = $1 AND new\_status = $2 ORDER BY created\_at DESC LIMIT 1`,

&nbsp;     \[id, previousStatus]

&nbsp;   );

&nbsp;   previousEditor = editorResult.rows\[0]?.performed\_by || request.requested\_by;



&nbsp;   console.log(`Rolling back: ${currentStatus} → ${previousStatus} (to ${previousEditor})`);



&nbsp;   // 1. Delete documents (SAFE)

&nbsp;   const documentsResult = await client.query(

&nbsp;     `SELECT id, file\_url, doc\_type FROM request\_documents 

&nbsp;      WHERE request\_id = $1 AND uploaded\_by = $2`,

&nbsp;     \[id, username]

&nbsp;   );

&nbsp;   const deletedFiles = documentsResult.rows.map(doc => ({

&nbsp;     id: doc.id, file\_url: doc.file\_url, doc\_type: doc.doc\_type

&nbsp;   }));



&nbsp;   if (documentsResult.rows.length > 0) {

&nbsp;     await client.query(

&nbsp;       `DELETE FROM request\_documents WHERE request\_id = $1 AND uploaded\_by = $2`,

&nbsp;       \[id, username]

&nbsp;     );

&nbsp;   }



&nbsp;   // 2. Amount reversion (NON-CRITICAL - won't fail transaction)

&nbsp;   let revertedAmount = null;

&nbsp;   try {

&nbsp;     const amountHistory = await client.query(

&nbsp;       `SELECT amount, updated\_by FROM external\_request\_amount\_history 

&nbsp;        WHERE request\_id = $1 ORDER BY updated\_at DESC LIMIT 2`,

&nbsp;       \[id]

&nbsp;     );



&nbsp;     if (amountHistory.rows.length >= 2 \&\& amountHistory.rows\[0].updated\_by === username) {

&nbsp;       revertedAmount = amountHistory.rows\[1].amount;

&nbsp;       await client.query(

&nbsp;         `UPDATE external\_request SET amount = $1 WHERE id = $2`,

&nbsp;         \[revertedAmount, id]

&nbsp;       );

&nbsp;       console.log("Amount reverted to:", revertedAmount);

&nbsp;     }

&nbsp;   } catch (amountError) {

&nbsp;     console.warn("Amount reversion skipped:", amountError.message);

&nbsp;   }



&nbsp;   // 3. CRITICAL: Update status (for all requests in batch/order)

&nbsp;   const { order\_id, batch\_id } = request;

&nbsp;   let statusUpdateQuery, statusUpdateValues;

&nbsp;   

&nbsp;   if (order\_id || batch\_id) {

&nbsp;     // Update all requests with same order\_id or batch\_id

&nbsp;     statusUpdateQuery = `UPDATE external\_request SET status = $1, updated\_at = NOW() 

&nbsp;                         WHERE (order\_id = $2 OR batch\_id = $3) RETURNING id`;

&nbsp;     statusUpdateValues = \[previousStatus, order\_id, batch\_id];

&nbsp;   } else {

&nbsp;     // Update only this request

&nbsp;     statusUpdateQuery = `UPDATE external\_request SET status = $1, updated\_at = NOW() 

&nbsp;                         WHERE id = $2 RETURNING id`;

&nbsp;     statusUpdateValues = \[previousStatus, id];

&nbsp;   }

&nbsp;   

&nbsp;   const statusUpdateResult = await client.query(statusUpdateQuery, statusUpdateValues);

&nbsp;   const updatedRequestIds = statusUpdateResult.rows.map(r => r.id);

&nbsp;   console.log(`Updated ${updatedRequestIds.length} request(s) to ${previousStatus}`);



&nbsp;   // 4. Log sendback

&nbsp;   await client.query(

&nbsp;     `INSERT INTO external\_request\_sendback\_history 

&nbsp;      (external\_request\_id, sent\_back\_by, sent\_back\_to, reason\_category, reason\_details, 

&nbsp;       previous\_status, current\_status, reverted\_amount, deleted\_files, created\_at)

&nbsp;      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW())`,

&nbsp;     \[id, username, previousEditor, reason\_category, reason\_details, previousStatus, currentStatus, revertedAmount, JSON.stringify(deletedFiles)]

&nbsp;   );



&nbsp;   // 5. Log event

&nbsp;   await client.query(

&nbsp;     `INSERT INTO external\_request\_event\_logs 

&nbsp;      (external\_request\_id, event\_type, event\_description, performed\_by, old\_status, new\_status)

&nbsp;      VALUES ($1, 'sendback', $2, $3, $4, $5)`,

&nbsp;     \[id, `Sent back: ${currentStatus} → ${previousStatus}`, username, currentStatus, previousStatus]

&nbsp;   );



&nbsp;   await client.query("COMMIT");



&nbsp;   // Return updated request

&nbsp;   const updatedRequest = await client.query(`SELECT \* FROM external\_request WHERE id = $1`, \[id]);

&nbsp;   const updated = updatedRequest.rows\[0];



&nbsp;   res.json({

&nbsp;     success: true,

&nbsp;     data: {

&nbsp;       ...updated,

&nbsp;       requestNumber: updated.request\_number,

&nbsp;       requestedBy: updated.requested\_by,

&nbsp;       createdAt: updated.created\_at,

&nbsp;       updatedAt: updated.updated\_at,

&nbsp;     },

&nbsp;     message: `Request sent back to ${previousEditor}. Status: ${previousStatus}`,

&nbsp;     deletedFilesCount: deletedFiles.length,

&nbsp;     amountReverted: !!revertedAmount,

&nbsp;   });



&nbsp; } catch (error) {

&nbsp;   await client.query("ROLLBACK");

&nbsp;   console.error("=== SENDBACK ERROR ===", error);

&nbsp;   console.error("Request ID:", id, "Status:", request?.status);

&nbsp;   res.status(500).json({

&nbsp;     success: false,

&nbsp;     message: error.message || "Failed to send back request",

&nbsp;   });

&nbsp; } finally {

&nbsp;   client.release();

&nbsp; }

});




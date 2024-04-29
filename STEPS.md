# DEMO STEPS

## Introduction

- Thanks for the introduction, not Meta, web dev, norway, consultant
- Excited to be here to tell you about enhancing your forms with rsc
- Going to code a simplified version of something i’ve built for my customer project, which is working well, where im actively using RSC.

## Setup and starting point

- App router, prisma and local DB, tailwind CSS
- This is now only server components. Show each component.
- Lets enhance this message box with react 19! Goal: make it interactive while minimizing js on the client and reducing forntend complexity.

## Basic form with server action

(MessageInput + submitMessage)

- Attach action prop using React's extension of the form component
- Code submitMessage server action
- Submit to db, add hidden userId field
- RevalidatePath purge cache

Notes: Lets start with the basic funcitonality. Make the form work and submit after reload with form action and hidden userId. Then revalidatePath. “Just by doing that…”

## Add scroll handler

(MessageBox)

- Add donut pattern listener snippet and explain.

Notes: Contains a children prop. Can pass anything here, for example server components. Only the js for the scroll handler is loaded.

## Validate data

(submitMessage)

- Validate data with zod
- Remove required on input, console.log error

Notes: Don't trust the input from the client.

## Return validation

(submitMessage)

- Return instead of console.log error and timestamp (create timestamp)
- (Optional) Try catch database error
- Get this to the user: useActionState, add initial state and add p "errorMessage", "use client"
- Pass _prevState and return Promise< State>

Notes: Can be called without js and return state without js.

## Max messages

(submitMessage)

- Add max limit messages sent 5 and show the error in the form.
- Add back required on input

Could be any requirements for your data.

## Toast message count

(MessageInput)

Input: useEffect reset and handle errors, depend on timestamp.  Modify to noscript handler fallback.

- useEffect to toast on error, depend on timestamp and error.
- reset form
- Change p tag to noscript

Notes: When next.js implements react 19 the reset will happen automatically for uncontrolled inputs like this. Noscript is a fallback.

## Return content for rollback on reset

(MessageInput)

- Return result.data.content in the payload.

Notes: A little bit rude to reset their input. Maybe this could be changed to be valid. Let's return the content and set it as the defaultValue so it's not lost.

## Slow server action

(submitMessage, MessageInput)

- Add slow() to server action
- Use third argument to show feedback
- Increase max messages

Notes: Realistic with a real db. Show feedback.

## DEMO

- By the way, this works without js!
- Add some, we dont get automatic scrolling or button feedback or toasts.
- Demo again with js.

## Explanation

- We’ve been progressively enhancing this, meaning ensuring the basic functionality works at the lowest level of resources, no javascript, then adding things on top to enhance the user experience for users with those resources available.
- Lets say your user is on a slow device or slow connection and still waiting for js to finish downloading, parsing, or executing. This will work before its loaded, and will make the hydration for the JS that we do want load faster, because we reduced the amount of js on the client by utilizing server component and weaving server and client. Now depening on the user’s situation, they will get the better experience, and always have a form that works.

## Optimistic update

- Stash current code
- Switch branch
- Send multiple messages until it fails

Notes: Can even enhance this further with optimistic updates. This still works without js.

## Conclusion

That's my talk, the code is pinned on my GitHub and the optimistic update is on a branch, thank you!
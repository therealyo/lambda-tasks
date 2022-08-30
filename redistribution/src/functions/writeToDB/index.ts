import { handlerPath } from '../../libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.handler`,
  events: [
    {
      sqs: "arn:aws:sqs:eu-west-2:843771403489:redistribution"
    }
  ],
};

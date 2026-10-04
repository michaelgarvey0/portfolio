import { redirect } from 'next/navigation';

/**
 * No hub grid yet - v7 is a premise check for one work item. Once the slide
 * shape is validated this becomes a real index like v4's.
 */
export default function LiveFlowV7Index() {
  redirect('/work/liveflow-v7/ai-transaction-categorization');
}

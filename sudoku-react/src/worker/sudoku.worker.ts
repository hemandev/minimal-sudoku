import { createWorker } from 'workerize-redux';

import { createNewGameFromWasm, createNewGame } from '../utils';
import { RootState } from '../app/rootReducer';
import { newGameFromWorker } from '../slices/gridSlice';

createWorker<RootState>(async (state, action) => {
  switch (action.type) {
    case newGameFromWorker.toString():
      return await createNewGameFromWasm(state?.gridReducer.difficulty);
  }
});

export default {};

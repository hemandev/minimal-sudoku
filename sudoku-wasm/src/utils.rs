use rand::Rng;

use crate::Difficulty;
use crate::EMPTY_VALUE;

pub fn generate_empty_blocks(range: usize) -> Vec<u32> {
    (0..range).map(|_x| EMPTY_VALUE).collect()
}

pub fn get_difficulty(difficulty: &str) -> Difficulty {
    match difficulty {
        "easy" => Difficulty::Easy,
        "medium" => Difficulty::Medium,
        "hard" => Difficulty::Hard,
        "expert" => Difficulty::Expert,
        _ => Difficulty::Easy,
    }
}

/**
 * Generates a random number between 0 and specified number
 * @param number - Specify the endLimit
 */
pub fn rng(number: u32) -> u32 {
    rand::thread_rng().gen_range(0, number)
}

/**
 * Fisher-Yates Array shuffling algorithm
 * @param array
 */
pub fn shuffle(array: &mut[u32]) {
    let mut n = array.len();
    while n > 0 {
        let i = rng(n as u32) as usize;
        n -= 1;
        let temp = array[i];
        array[i] = array[n];
        array[n] = temp;
    }
}

pub fn copy_grid(blocks: &Vec<u32>) -> Vec<u32> {
    blocks.clone()
}

pub fn get_index(grid_size: usize, row: usize, col: usize) -> usize {
    (row * grid_size + col) as usize
}

pub fn get_block_value(blocks: &Vec<u32>, grid_size: usize, row: usize, col: usize) -> u32 {
    let index = get_index(grid_size, row, col);
    blocks[index]
}

pub fn identify_working_square(blocks: &Vec<u32>, (row, col): (usize, usize), grid_size: usize) -> Vec<u32> {
    let mut square: Vec<u32> = vec![];
    let col_lower_limit = if col < 3 {
        0
    } else {
        if col < 6 {
            3
        } else {
            6
        }
    };
    let row_lower_limit = if row < 3 {
        0
    } else {
        if row < 6 {
            3
        } else {
            6
        }
    };

    let mut index_lower_limit = get_index(grid_size, row_lower_limit, col_lower_limit);

    for _i in 0..3 {
        square.extend_from_slice(&blocks[index_lower_limit..index_lower_limit + 3]);
        index_lower_limit += 9;
    }

    square
}

pub fn is_in_grid_row(blocks: &Vec<u32>, (row, _, grid_size, value): (usize, usize,usize, &u32)) -> bool {
    for i in 0..grid_size {
        if get_block_value(&blocks, grid_size, row, i) == *value {
            return true;
        }
    }
    false
}

pub fn is_in_grid_col(blocks: &Vec<u32>, (_, col, grid_size, value): (usize, usize, usize, &u32)) -> bool {
    for i in 0..grid_size {
        if get_block_value(&blocks, grid_size, i, col) == *value {
            return true;
        }
    }
    false
}

pub fn is_in_grid_square(blocks: &Vec<u32>, (row, col, grid_size, value): (usize, usize, usize, &u32)) -> bool {
    let working_square = identify_working_square(&blocks, (row, col), grid_size);
    working_square.iter().any(|x| x == value)
}

pub fn is_valid_insert(blocks: &Vec<u32>, args: (usize, usize, usize, &u32)) -> bool {
    !is_in_grid_row(blocks, args) && !is_in_grid_col(blocks, args) && !is_in_grid_square(blocks, args)
}

pub fn find_empty_index(blocks: &Vec<u32>) -> Option<usize> {
    blocks.iter().position(|&val| val == EMPTY_VALUE)
}

pub fn is_grid_full(blocks: &Vec<u32>) -> bool {
    !blocks.iter().any(|x| x == &EMPTY_VALUE)
}
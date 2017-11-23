      // grid rows (desktop)
      let Rows: {
          Title: 1,
          Contact: 2,
          Log: 3,
          Story: 4,
          Map:4,
          Controls: 5,
          Controls2: 5,
          Controls3: null,
          Backpack: 6,
          SpellBook: 7,
          Gear: {Start: 6, End: 8},
          BottomControls: 9,
          Volume: 9,
          GameState: 10,
      }
      
      if (MobileScreen) {
     
      Rows: {
          Title: 1,
          Contact: 2,
          Log: 3,
          Story: 4,
          Map:5,
          Controls: 6,
          Controls2: 7,
          Controls3: 8,
          Backpack: 9,
          SpellBook: 10,
          Gear: {Start: 11, End: 12},
          BottomControls: 13,
          Volume: 14,
          GameState: 15,
      }
      }
        
      // grid columns
      
      let Columns: {
          Contact: {Start: 5, End: LastColumn},
          Story: {Start: FirstColumn, End: 6},
          Map: {Start: 6, End: LastColumn},
          Weapons: {Start: Firstcolumn, End: 2},
          Vitals: {Start: 2, End: 3},
          Arrows: {Start: 3, End:4},
          Actions: {Start: 4, End: 6},
          Experience: {Start:6, End:7},
          Abilities: {Start: 6, End: LastColumn},
          Backpack: {Start: FirstColumn, End: 7},
          SpellBook: {Start: FirstColumn, End: 7}
          Gear: {Start: 7, End: LastColumn},
      }
      
      if (MobileScreen) {
            
      
      Columns: {
          Contact: {Start: FirstColumn, End: LastColumn},
          Story: {Start: FirstColumn, End: LastColumn},
          Map: {Start: FirstColumn, End: LastColumn},
          Weapons: {Start: Firstcolumn, End: 4},
          Vitals: {Start: 4, End: 7},
          Arrows: {Start: 7, End: LastColumn},
          Actions: {Start: FirstColumn, End: 4},
          Experience: {Start: 4, End: 7},
          Abilities: {Start: 7, End: LastColumn},
          Backpack: {Start: FirstColumn, End: LastColumn},
          SpellBook: {Start: FirstColumn, End: LastColumn}
          Gear: {Start: FirstColumn, End: LastColumn},
      } 
            
            
        
      }
      else if (TabletScreen) {
        
        Columns.Vitals = {Start: 2, End:4}
        Columns.Arrows = {Start: 4, End:5}
        Columns.Actions = {Start: 5, End: 6}
        
      }

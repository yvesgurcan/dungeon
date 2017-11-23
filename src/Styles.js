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
      let StoryStartColumn = FirstColumn
      let StoryEndColumn = 6
      let MapStartColumn = StoryEndColumn
      let MapEndColumn = LastColumn
      let ContactColumnStart = 5
      let ContactColumnStop = LastColumn
      let PlayerWeaponStartColumn = FirstColumn
      let PlayerWeaponStopColumn = 2
      let PlayerVitalsStartColumn = PlayerWeaponStopColumn
      let PlayerVitalsStopColumn = 3
      let DirectionalArrowStartColumn = PlayerVitalsStopColumn
      let DirectionalArrowStopColumn = 4
      let PlayerActionStartColumn = DirectionalArrowStopColumn
      let PlayerActionStopColumn = 6
      let PlayerStat2StartColumn = PlayerActionStopColumn
      let PlayerStat2StopColumn = 7
      let PlayerAttributesStartColumn = PlayerStat2StopColumn
      let PlayerAttributesBlockSeparation = PlayerAttributesStartColumn
      let PlayerAttributesStopColumn = LastColumn
      let InventoryStartColumn = FirstColumn
      let InventoryStopColumn = 7
      let SpellBookStartColumn = FirstColumn
      let SpellBookStopColumn = 7
      let AccessoriesStartColumn = 7
      let AccessoriesStopColumn = LastColumn
      if (MobileScreen) {
        StoryStartColumn = FirstColumn
        StoryEndColumn = LastColumn
        MapStartColumn = FirstColumn
        MapEndColumn = LastColumn
        ContactColumnStart = FirstColumn
        ContactColumnStop = LastColumn
        PlayerWeaponStartColumn = FirstColumn
        PlayerWeaponStopColumn = 4
        PlayerVitalsStartColumn = PlayerWeaponStopColumn
        PlayerVitalsStopColumn = 7
        DirectionalArrowStartColumn = PlayerVitalsStopColumn
        DirectionalArrowStopColumn = 9
        PlayerActionStartColumn = FirstColumn
        PlayerActionStopColumn = 4
        PlayerAttributesStartColumn = PlayerActionStopColumn
        PlayerAttributesStopColumn = 4
        PlayerAttributesBlockSeparation = 7
        PlayerAttributesStopColumn = LastColumn
        InventoryStartColumn = FirstColumn
        InventoryStopColumn = LastColumn
        SpellBookStartColumn = FirstColumn
        SpellBookStopColumn = LastColumn
        AccessoriesStartColumn = FirstColumn
        AccessoriesStopColumn = LastColumn
      }
      else if (TabletScreen) {
        PlayerVitalsStartColumn = PlayerWeaponStopColumn
        PlayerVitalsStopColumn = 4
        DirectionalArrowStartColumn = PlayerVitalsStopColumn
        DirectionalArrowStopColumn = 5
        PlayerActionStartColumn = DirectionalArrowStopColumn
        PlayerActionStopColumn = 6
        PlayerAttributesStartColumn = PlayerActionStopColumn
        PlayerAttributesBlockSeparation = 7
        PlayerAttributesStopColumn = LastColumn
      }

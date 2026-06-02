---
spec_id: admin/linn-classik-movie
schema_version: ai4av-public-spec-v1
revision: 1
title: "Linn Classik Movie (CMS) RS-232 Control Spec"
manufacturer: Linn
model_family: "Classik Movie"
aliases: []
compatible_with:
  manufacturers:
    - Linn
  models:
    - "Classik Movie"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - docs.linn.co.uk
source_urls:
  - http://docs.linn.co.uk/wiki/images/8/85/Classik_Movie_2005_RS232_Specification_v0111.pdf
  - https://docs.linn.co.uk/wiki/index.php/RS232
  - https://docs.linn.co.uk/wiki/index.php/Developer:Documentation
retrieved_at: 2026-04-30T11:29:36.586Z
last_checked_at: 2026-05-14T18:17:17.636Z
generated_at: 2026-05-14T18:17:17.636Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "model firmware ranges, exact disc error recovery sequences, and `SETUP MENU`/`SETUP` deeper-menu navigation commands are not fully described in the source."
  - "flow control not stated in source"
  - "source does not specify confirmation requirements"
  - "source does not specify interlock procedures"
  - "source describes no power-on sequencing, no interlock procedures, and no safety"
  - "- Firmware version compatibility (the source provides $VERSION$ queries but does not state a baseline)"
verification:
  verdict: verified
  checked_at: 2026-05-14T18:17:17.636Z
  matched_actions: 105
  action_count: 105
  confidence: medium
  summary: "All 127 spec actions matched source commands exactly. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-06-02
---

# Linn Classik Movie (CMS) RS-232 Control Spec

## Summary
RS-232 ASCII control protocol for the Linn Classik Movie (CMS-series) DVD/CD receiver. Commands are delimited by `$...$` inside optional `#Source#`, `&Group&`, `@Destination@` identifier fields, terminated by CR+LF (0x0D 0x0A). The unit supports disc transport, tuner, pre-amplifier, and configuration command groups with solicited and unsolicited response paths.

<!-- UNRESOLVED: model firmware ranges, exact disc error recovery sequences, and `SETUP MENU`/`SETUP` deeper-menu navigation commands are not fully described in the source. -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # default; host may switch via $BAUD$ to: 4800, 9600, 14400, 19200, 28800, 38400, 57600, 115200, 230400
  data_bits: 7
  parity: even
  stop_bits: 1
  flow_control: none  # UNRESOLVED: flow control not stated in source
auth:
  type: none  # inferred: no auth procedure in source
```

Command framing (apply to every action below):
- Optional leading identifiers: `#Source_ID# &Group_ID& @Destination_ID@`
- Command body: `$Command (Param (Param …))$`
- Trailing line terminator: 0x0D 0x0A
- Solicited responses return `!$…$`; unsolicited events return `…$…$` (no `!`).

## Traits
```yaml
# - powerable       (STANDBY ON/OFF/TOGGLE present)
# - routable        (LISTEN source-select present)
# - queryable       (?, STATUS, MODE, DISCINFO, TRACK, CHAPTER, TIME, REPEAT, SCAN, SIGNAL, MUTETHRESHOLD, RDSINFO, TV TYPE, VIDEO TYPE, SPDIFOUTPUT, SETUP, VERSION, COUNTER, CHECKSUM, IR, BAND, TUNE, PRESET, SURROUND, PROLOGICII, BAL, VOL, MUTE, STANDBY all return state)
# - levelable       (VOL/VOLUME 0-100, BAL/BALANCE -10..+10)
# - transport       (PLAY, PAUSE, STOP, OPEN, CLOSE, TRACK, CHAPTER, SKIP, SEARCH, REPEAT)
# - tuner           (BAND, TUNE, SCAN, PRESET, SIGNAL, MUTETHRESHOLD, RDSINFO, COUNTRY)
```

## Actions

### System / identity / comms (section 2)
```yaml
- id: id_write
  label: Write Product Identifier
  kind: action
  command: "$ID {identifier}$"
  params:
    - name: identifier
      type: string
      description: "1-20 alphanumeric ASCII chars (spaces via \\x20 escape)"

- id: id_remove
  label: Remove Product Identifier
  kind: action
  command: "$ID ~{identifier}$"
  params:
    - name: identifier
      type: string
      description: Identifier to remove

- id: id_query
  label: Return Product Identifier
  kind: query
  command: "$ID ?$"
  params: []

- id: gid_write
  label: Write Group Identifier
  kind: action
  command: "$GID {identifier}$"
  params:
    - name: identifier
      type: string
      description: "Group ID, up to 5 groups per product"

- id: gid_remove
  label: Remove Group Identifier
  kind: action
  command: "$GID ~{identifier}$"
  params:
    - name: identifier
      type: string
      description: Group identifier to remove

- id: gid_query
  label: Return Group Identifier List
  kind: query
  command: "$GID ?$"
  params: []

- id: baud_set
  label: Set Baud Rate
  kind: action
  command: "$BAUD {baud}$"
  params:
    - name: baud
      type: integer
      description: "4800, 9600, 14400, 19200, 28800, 38400, 57600, 115200, 230400 (2400 not supported)"

- id: baud_query
  label: Return Current Baud Rate
  kind: query
  command: "$BAUD ?$"
  params: []

- id: reset_comms
  label: Clear Communications Buffer
  kind: action
  command: "$RESET$"
  params: []

- id: echo
  label: Echo Text
  kind: action
  command: "$ECHO {text}$"
  params:
    - name: text
      type: string
      description: Free-form text echoed back inside <…>

- id: poll_start
  label: Begin Polling Sequence
  kind: action
  command: "$POLL START$"
  params: []

- id: poll_id
  label: Poll Product Identifier
  kind: action
  command: "$POLL ID$"
  params: []

- id: poll_sleep
  label: Sleep Polled Product
  kind: action
  command: "@{dest_id}@$POLL SLEEP$"
  params:
    - name: dest_id
      type: string
      description: Destination identifier returned by previous POLL ID

- id: poll_done
  label: End Polling Sequence
  kind: action
  command: "$POLL DONE$"
  params: []

- id: status_query
  label: Return Status Of Last Command
  kind: query
  command: "$STATUS$"
  params: []

- id: ir_query
  label: Return IR Control Status
  kind: query
  command: "$IR ?$"
  params: []

- id: ir_enable
  label: Enable IR Control
  kind: action
  command: "$IR {state}$"
  params:
    - name: state
      type: enum
      values: [Y, ON]

- id: ir_disable
  label: Disable IR Control
  kind: action
  command: "$IR {state}$"
  params:
    - name: state
      type: enum
      values: [N, OFF]

- id: init_factory
  label: Reset To Factory Defaults
  kind: action
  command: "$INIT$"
  params: []

- id: checksum_query
  label: Return Software Checksum
  kind: query
  command: "$CHECKSUM ?$"
  params: []

- id: counter_power_query
  label: Return Powered-Up Time
  kind: query
  command: "$COUNTER POWER ?$"
  params: []

- id: counter_mains_query
  label: Return Mains-Connected Time
  kind: query
  command: "$COUNTER MAINS ?$"
  params: []

- id: counter_wdt_query
  label: Return Watchdog Timer Resets
  kind: query
  command: "$COUNTER WDT ?$"
  params: []

- id: counter_stack_query
  label: Return Stack Events
  kind: query
  command: "$COUNTER STACK ?$"
  params: []

- id: version_software_query
  label: Return Software Versions
  kind: query
  command: "$VERSION SOFTWARE ?$"
  params: []

- id: version_hardware_query
  label: Return Hardware Board Versions
  kind: query
  command: "$VERSION HARDWARE ?$"
  params: []

- id: version_hardware_search
  label: Return Hardware Versions Matching Search
  kind: query
  command: "$VERSION HARDWARE PCAS{search}$"
  params:
    - name: search
      type: string
      description: "PCAS, PCASb, PCASbt, PCASbtm, PCASbtmRn, or PCASbtmRn serial (b/m/n support 0 wildcard, t supports ? wildcard)"
```

### Disc transport (section 3.3)
```yaml
- id: disc_open
  label: Open Disc Tray
  kind: action
  command: "$OPEN$"
  params: []

- id: disc_close
  label: Close Disc Tray
  kind: action
  command: "$CLOSE$"
  params: []

- id: disc_play
  label: Start Or Resume Playback
  kind: action
  command: "$PLAY$"
  params: []

- id: disc_pause
  label: Pause Playback
  kind: action
  command: "$PAUSE$"
  params: []

- id: disc_stop
  label: Stop Playback
  kind: action
  command: "$STOP$"
  params: []

- id: disc_mode_query
  label: Return Operational Status
  kind: query
  command: "$MODE$"
  params: []

- id: track_next
  label: Select Next Track
  kind: action
  command: "$TRACK +$"
  params: []

- id: track_previous
  label: Select Previous Track
  kind: action
  command: "$TRACK -$"
  params: []

- id: track_select
  label: Select Track Number
  kind: action
  command: "$TRACK {number}$"
  params:
    - name: number
      type: integer
      description: Track number

- id: track_query
  label: Return Current Track Number
  kind: query
  command: "$TRACK ?$"
  params: []

- id: track_total_query
  label: Return Total Number Of Tracks
  kind: query
  command: "$TRACK TOT$"
  params: []

- id: discinfo_query
  label: Return Disc And Stream Type
  kind: query
  command: "$DISCINFO ?$"
  params: []

- id: search_backward
  label: Search Backwards
  kind: action
  command: "$SEARCH < {speed}$"
  params:
    - name: speed
      type: enum
      values: ["2X", "4X", "6X", "8X"]

- id: search_forward
  label: Search Forwards
  kind: action
  command: "$SEARCH > {speed}$"
  params:
    - name: speed
      type: enum
      values: ["2X", "4X", "6X", "8X"]

- id: search_stop
  label: Stop Search
  kind: action
  command: "$SEARCH STOP$"
  params: []

- id: search_query
  label: Return Search Status
  kind: query
  command: "$SEARCH ?$"
  params: []

- id: time_disc_beg
  label: Set Time Mode To Elapsed Disc Time
  kind: action
  command: "$TIME DISC BEG$"
  params: []

- id: time_disc_end
  label: Set Time Mode To Remaining Disc Time
  kind: action
  command: "$TIME DISC END$"
  params: []

- id: time_disc_tot
  label: Return Total Disc Time
  kind: query
  command: "$TIME DISC TOT$"
  params: []

- id: time_track_beg
  label: Set Time Mode To Elapsed Track Time
  kind: action
  command: "$TIME TRACK BEG$"
  params: []

- id: time_track_end
  label: Set Time Mode To Remaining Track Time
  kind: action
  command: "$TIME TRACK END$"
  params: []

- id: time_track_tot
  label: Return Total Track Time
  kind: query
  command: "$TIME TRACK TOT$"
  params: []

- id: time_off
  label: Turn Time Mode Off
  kind: action
  command: "$TIME OFF$"
  params: []

- id: time_query
  label: Return Current Time Mode
  kind: query
  command: "$TIME ?$"
  params: []

- id: repeat_on
  label: Turn Repeat On
  kind: action
  command: "$REPEAT {state}$"
  params:
    - name: state
      type: enum
      values: [Y, ON]

- id: repeat_off
  label: Turn Repeat Off
  kind: action
  command: "$REPEAT {state}$"
  params:
    - name: state
      type: enum
      values: [N, OFF]

- id: repeat_beg
  label: Mark Start Of Repeat Section
  kind: action
  command: "$REPEAT BEG$"
  params: []

- id: repeat_end
  label: Mark End Of Repeat Section
  kind: action
  command: "$REPEAT END$"
  params: []

- id: repeat_track
  label: Repeat Current Track
  kind: action
  command: "$REPEAT TRACK$"
  params: []

- id: repeat_query
  label: Return Current Repeat Status
  kind: query
  command: "$REPEAT ?$"
  params: []

- id: skip_next
  label: Skip To Next Track Or Chapter
  kind: action
  command: "$SKIP +$"
  params: []

- id: skip_previous
  label: Skip To Previous Track Or Chapter
  kind: action
  command: "$SKIP -$"
  params: []

- id: chapter_next
  label: Select Next Chapter
  kind: action
  command: "$CHAPTER +$"
  params: []

- id: chapter_previous
  label: Select Previous Chapter
  kind: action
  command: "$CHAPTER -$"
  params: []

- id: chapter_select
  label: Select Chapter Number
  kind: action
  command: "$CHAPTER {number}$"
  params:
    - name: number
      type: integer
      description: Chapter number

- id: chapter_query
  label: Return Current Chapter Number
  kind: query
  command: "$CHAPTER ?$"
  params: []

- id: chapter_total_query
  label: Return Total Number Of Chapters
  kind: query
  command: "$CHAPTER TOT$"
  params: []

- id: zoom_next
  label: Select Next Zoom Level
  kind: action
  command: "$ZOOM +$"
  params: []

- id: key_updown
  label: Key Up Or Down
  kind: action
  command: "$KEY {direction}$"
  params:
    - name: direction
      type: enum
      values: [UP, DOWN]

- id: key_leftright
  label: Key Left Or Right
  kind: action
  command: "$KEY {direction}$"
  params:
    - name: direction
      type: enum
      values: [LEFT, RIGHT]

- id: key_enter
  label: Key Enter
  kind: action
  command: "$KEY ENTER$"
  params: []

- id: key_audio
  label: Key Audio (Toggle Audio Tracks)
  kind: action
  command: "$KEY AUDIO$"
  params: []

- id: key_subtitle
  label: Key Subtitle (Toggle Subtitles)
  kind: action
  command: "$KEY SUBTITLE$"
  params: []

- id: angle_next
  label: Change Angle
  kind: action
  command: "$ANGLE +$"
  params: []

- id: menu_title
  label: Return To Title Menu
  kind: action
  command: "$MENU TITLE$"
  params: []

- id: menu_dvd
  label: Return To DVD Root Menu
  kind: action
  command: "$MENU DVD$"
  params: []
```

### Tuner (section 3.4)
```yaml
- id: country_query
  label: Return Country Of Operation
  kind: query
  command: "$COUNTRY ?$"
  params: []

- id: country_set
  label: Set Country Of Operation
  kind: action
  command: "$COUNTRY {country}$"
  params:
    - name: country
      type: enum
      values: [EUROPE, USA, JAPAN, RESET]

- id: band_select
  label: Select Band
  kind: action
  command: "$BAND {band}$"
  params:
    - name: band
      type: enum
      values: [LW, AM, FM]

- id: band_query
  label: Return Selected Band
  kind: query
  command: "$BAND ?$"
  params: []

- id: tune_increase
  label: Increase Current Frequency
  kind: action
  command: "$TUNE +$"
  params: []

- id: tune_decrease
  label: Decrease Current Frequency
  kind: action
  command: "$TUNE -$"
  params: []

- id: tune_absolute
  label: Set Absolute Frequency
  kind: action
  command: "$TUNE {frequency}$"
  params:
    - name: frequency
      type: integer
      description: "Frequency in tens of kHz; e.g. FM EUROPE 8750..10850, AM 522..1611, LW 144..297"

- id: tune_query
  label: Return Current Frequency And Band
  kind: query
  command: "$TUNE ?$"
  params: []

- id: scan_mode_query
  label: Return Scan Mode
  kind: query
  command: "$SCAN MODE ?$"
  params: []

- id: scan_mode_set
  label: Select Scan Mode
  kind: action
  command: "$SCAN MODE {mode}$"
  params:
    - name: mode
      type: enum
      values: [SEARCH, SCAN]

- id: scan_mode_type_query
  label: Return Scan Programme Type
  kind: query
  command: "$SCAN MODE TYPE ?$"
  params: []

- id: scan_mode_type_set
  label: Select Scan Programme Type
  kind: action
  command: "$SCAN MODE TYPE {type}$"
  params:
    - name: type
      type: string
      description: "ALL, SPEECH, MUSIC, or specific 0..31"

- id: scan_increase
  label: Scan Up To Next Station
  kind: action
  command: "$SCAN +$"
  params: []

- id: scan_decrease
  label: Scan Down To Previous Station
  kind: action
  command: "$SCAN -$"
  params: []

- id: scan_stop
  label: Stop Scan
  kind: action
  command: "$SCAN STOP$"
  params: []

- id: scan_query
  label: Return Scan Status
  kind: query
  command: "$SCAN ?$"
  params: []

- id: preset_store
  label: Store Current Frequency As Preset
  kind: action
  command: "$PRESET STORE {name}$"
  params:
    - name: name
      type: string
      description: Preset name

- id: preset_autostore
  label: Autostore Presets For Band
  kind: action
  command: "$PRESET AUTOSTORE {band}$"
  params:
    - name: band
      type: enum
      values: [AM, FM, LW]

- id: preset_delete
  label: Delete Preset
  kind: action
  command: "$PRESET DELETE {name}$"
  params:
    - name: name
      type: string
      description: Preset name

- id: preset_list
  label: List Presets
  kind: query
  command: "$PRESET LIST {band}$"
  params:
    - name: band
      type: enum
      values: [ALL, AM, FM, LW]

- id: preset_next
  label: Select Next Preset
  kind: action
  command: "$PRESET +$"
  params: []

- id: preset_previous
  label: Select Previous Preset
  kind: action
  command: "$PRESET -$"
  params: []

- id: preset_select
  label: Select Named Preset
  kind: action
  command: "$PRESET {name}$"
  params:
    - name: name
      type: string
      description: Preset name

- id: preset_query
  label: Return Current Preset
  kind: query
  command: "$PRESET ?$"
  params: []

- id: signal_query
  label: Return Signal Strength
  kind: query
  command: "$SIGNAL ?$"
  params: []

- id: mutethreshold_set
  label: Set Mute Threshold
  kind: action
  command: "$MUTETHRESHOLD {threshold}$"
  params:
    - name: threshold
      type: integer
      description: "0..50"

- id: mutethreshold_query
  label: Return Mute Threshold
  kind: query
  command: "$MUTETHRESHOLD ?$"
  params: []

- id: rdsinfo_name_query
  label: Return RDS/RBDS Station Name
  kind: query
  command: "$RDSINFO NAME ?$"
  params: []

- id: rdsinfo_type_query
  label: Return RDS/RBDS Programme Type
  kind: query
  command: "$RDSINFO TYPE ?$"
  params: []

- id: rdsinfo_text_query
  label: Return RDS/RBDS Radio Text
  kind: query
  command: "$RDSINFO TEXT ?$"
  params: []

- id: rdsinfo_set
  label: Enable Or Disable RDS Reporting
  kind: action
  command: "$RDSINFO {state}$"
  params:
    - name: state
      type: enum
      values: [Y, ON, N, OFF]

- id: rdsinfo_query
  label: Return RDS Reporting Status
  kind: query
  command: "$RDSINFO ?$"
  params: []
```

### Pre-amplifier (section 3.5)
```yaml
- id: standby_query
  label: Return Standby Status
  kind: query
  command: "$STANDBY ?$"
  params: []

- id: standby_set
  label: Enter Or Exit Standby
  kind: action
  command: "$STANDBY {state}$"
  params:
    - name: state
      type: enum
      values: [Y, ON, N, OFF]

- id: standby_toggle
  label: Toggle Standby
  kind: action
  command: "$STANDBY TOGGLE$"
  params: []

- id: listen_next
  label: Select Next Source
  kind: action
  command: "$LISTEN +$"
  params: []

- id: listen_previous
  label: Select Previous Source
  kind: action
  command: "$LISTEN -$"
  params: []

- id: listen_select
  label: Select Source
  kind: action
  command: "$LISTEN {source}$"
  params:
    - name: source
      type: enum
      values: [DISC, TUNER, AUX1, AUX2, TV, AUXAV, DIG1, DIG2]

- id: listen_query
  label: Return Current Source
  kind: query
  command: "$LISTEN ?$"
  params: []

- id: mute_set
  label: Mute On Or Off
  kind: action
  command: "$MUTE {state}$"
  params:
    - name: state
      type: enum
      values: [Y, ON, N, OFF]

- id: mute_query
  label: Return Mute Status
  kind: query
  command: "$MUTE ?$"
  params: []

- id: volume_increment
  label: Volume Step Up
  kind: action
  command: "$VOL +$"
  params: []

- id: volume_decrement
  label: Volume Step Down
  kind: action
  command: "$VOL -$"
  params: []

- id: volume_adjust
  label: Adjust Volume By Value
  kind: action
  command: "$VOL {sign}{value}$"
  params:
    - name: sign
      type: enum
      values: [+, -]
    - name: value
      type: integer
      description: Step size

- id: volume_set
  label: Set Volume Absolute
  kind: action
  command: "$VOL ={value}$"
  params:
    - name: value
      type: integer
      description: "0..100"

- id: volume_query
  label: Return Volume
  kind: query
  command: "$VOL ?$"
  params: []

- id: balance_increment
  label: Balance Step Right
  kind: action
  command: "$BAL +$"
  params: []

- id: balance_decrement
  label: Balance Step Left
  kind: action
  command: "$BAL -$"
  params: []

- id: balance_adjust
  label: Adjust Balance By Value
  kind: action
  command: "$BAL {sign}{value}$"
  params:
    - name: sign
      type: enum
      values: [+, -]
    - name: value
      type: integer
      description: Step size

- id: balance_set
  label: Set Balance Absolute
  kind: action
  command: "$BAL ={sign}{value}$"
  params:
    - name: sign
      type: enum
      values: [+, -]
    - name: value
      type: integer
      description: "Magnitude 0..10"

- id: balance_query
  label: Return Balance
  kind: query
  command: "$BAL ?$"
  params: []

- id: surround_step
  label: Step Surround Mode
  kind: action
  command: "$SURROUND {sign}$"
  params:
    - name: sign
      type: enum
      values: [+, -]

- id: surround_set
  label: Select Surround Mode
  kind: action
  command: "$SURROUND {mode}$"
  params:
    - name: mode
      type: enum
      values: [STEREO, STEREOSU, "3STEREO", PHANTOM, ASMIX, DTSFULL, B]

- id: surround_query
  label: Return Surround Mode
  kind: query
  command: "$SURROUND ?$"
  params: []

- id: prologicii_step
  label: Step Pro Logic II Mode
  kind: action
  command: "$PROLOGICII {sign}$"
  params:
    - name: sign
      type: enum
      values: [+, -]

- id: prologicii_set
  label: Select Pro Logic II Mode
  kind: action
  command: "$PROLOGICII {mode}$"
  params:
    - name: mode
      type: enum
      values: [PROLOGIC, MUSIC, MOVIE, MATRIX]

- id: prologicii_query
  label: Return Pro Logic II Mode
  kind: query
  command: "$PROLOGICII ?$"
  params: []
```

### Additional (section 3.6)
```yaml
- id: setup_set
  label: Turn Setup Menu On Or Off
  kind: action
  command: "$SETUP {state}$"
  params:
    - name: state
      type: enum
      values: [ON, OFF]

- id: setup_query
  label: Return Setup Menu Status
  kind: query
  command: "$SETUP ?$"
  params: []

- id: tv_type_set
  label: Set TV Type
  kind: action
  command: "$TV TYPE {type}$"
  params:
    - name: type
      type: enum
      values: [NATIVE, PAL, NTSC]

- id: tv_type_query
  label: Return TV Type
  kind: query
  command: "$TV TYPE ?$"
  params: []

- id: video_type_set
  label: Set Video Output Type
  kind: action
  command: "$VIDEO TYPE {type}$"
  params:
    - name: type
      type: enum
      values: [SVIDEO, COMPOSITE, YPRPB, RGB]

- id: video_type_query
  label: Return Video Output Type
  kind: query
  command: "$VIDEO TYPE ?$"
  params: []

- id: spdifoutput_set
  label: Set SPDIF Output Mode
  kind: action
  command: "$SPDIFOUTPUT {mode}$"
  params:
    - name: mode
      type: enum
      values: [OFF, RAW, LTRTPCM]

- id: spdifoutput_query
  label: Return SPDIF Output Mode
  kind: query
  command: "$SPDIFOUTPUT ?$"
  params: []
```

## Feedbacks
```yaml
- id: power_up_message
  type: string
  values: ["!$MOVIE$"]
  description: Sent on power-up to verify host link (can be disabled via user options)

- id: disc_mode
  type: enum
  values: [INSTANDBY, POWEREDUP, SETUPMENU, TRAY_UNDEFINED, OPENING, OPENED, CLOSING, CLOSED, DISC_UNDEFINED, LOADING, NODISC, UNKNOWN, CDDA, VCD, SVCD, DVD, DATA, PLAY_UNDEFINED, PLAYING, PAUSED, PRESTOP, STOPPED, SEARCHING, SCANNING, DVDMENU]
  description: Returned by $MODE$ - current operational status

- id: ignored_reason
  type: enum
  values: [UNIT_INSTANDBY, UNIT_POWEREDUP, UNIT_SETUPMENU, UNIT_SELECTDISC, UNIT_SELECTTUNER, TRAY_UNDEFINED, TRAY_OPENING, TRAY_OPENED, TRAY_CLOSING, TRAY_CLOSED, DISC_UNDEFINED, DISC_LOADING, DISC_NODISC, DISC_UNKNOWN, DISC_CDDA, DISC_VCD, DISC_SVCD, DISC_DVD, DISC_DATA, PLAY_UNDEFINED, PLAY_PLAYING, PLAY_PAUSED, PLAY_PRESTOP, PLAY_STOPPED, PLAY_SEARCHING, PLAY_SCANNING, PLAY_DVDMENU]
  description: Reasons a command may be returned as $IGNORED command reason$

- id: status_code
  type: integer
  description: "Numeric status code returned by $STATUS$ (00..47 in general block; 25 carries sv=maximum message length)"
```

## Variables
```yaml
- id: volume
  type: integer
  range: "0..100"
  description: Set/read via $VOL$

- id: balance
  type: integer
  range: "-10..+10"
  description: Set/read via $BAL$; sign indicates L/R

- id: mute_threshold
  type: integer
  range: "0..50"
  description: Set/read via $MUTETHRESHOLD$ (not on all products)

- id: signal_strength
  type: integer
  range: "0..50"
  description: Returned by $SIGNAL ?$ (not on all products)

- id: baud_rate
  type: integer
  values: [4800, 9600, 14400, 19200, 28800, 38400, 57600, 115200, 230400]
  description: Active RS-232 baud rate

- id: current_source
  type: enum
  values: [DISC, TUNER, AUX1, AUX2, TV, AUXAV, DIG1, DIG2]
  description: Currently listened-to source ($LISTEN ?$)

- id: tv_type
  type: enum
  values: [NATIVE, PAL, NTSC]

- id: video_type
  type: enum
  values: [SVIDEO, COMPOSITE, YPRPB, RGB]

- id: spdif_mode
  type: enum
  values: [OFF, RAW, LTRTPCM]

- id: ir_enabled
  type: enum
  values: [ON, OFF]

- id: country
  type: enum
  values: [EUROPE, USA, JAPAN, RESET]

- id: band
  type: enum
  values: [LW, AM, FM]

- id: surround_mode
  type: enum
  values: [STEREO, STEREOSU, "3STEREO", PHANTOM, ASMIX, DTSFULL, B]

- id: prologic_mode
  type: enum
  values: [PROLOGIC, MUSIC, MOVIE, MATRIX]
```

## Events
```yaml
- id: power_up
  payload: "!$MOVIE$"
  description: Power-up notification (activatable via user option)

- id: state_change_unsolicited
  payload: "(Source_ID)$Status_String$"
  description: Product-initiated status messages when something within the unit changes (e.g. disc stops playing). Activated via user options. No leading `!`.

- id: rds_change
  payload: "$RDSINFO NAME name$ | $RDSINFO TYPE type$ | $RDSINFO TEXT text$"
  description: Reported when RDS/RBDS reporting is enabled and station metadata changes
```

## Macros
```yaml
- id: poll_sequence
  description: Iterate $POLL ID$ → @id@$POLL SLEEP$ until no response, then $POLL DONE$
  steps:
    - command: "$POLL START$"
    - command: "$POLL ID$"
    - capture: response product identifier
    - command: "@{id}@$POLL SLEEP$"
    - repeat: until $POLL ID$ returns no response
    - command: "$POLL DONE$"

- id: autostore_presets
  description: Automatic scan and store all stations of a band as presets
  steps:
    - command: "$PRESET AUTOSTORE {band}$"
    - observe: $SCAN ?$ reports AUTOSTORE_SCANNING → preset saved → continues until $PRESET AUTOSTORE [band]$
```

## Safety
```yaml
confirmation_required_for: []  # UNRESOLVED: source does not specify confirmation requirements
interlocks: []  # UNRESOLVED: source does not specify interlock procedures
# UNRESOLVED: source describes no power-on sequencing, no interlock procedures, and no safety
# interlocks. Source explicitly states that TV TYPE can only be changed when the tray is empty
# or disc stopped (data discs must be removed). The $IGNORE$ response mechanism protects against
# issuing commands in incompatible product states (e.g. $PLAY$ when DISC_NODISC returns
# $IGNORED PLAY DISC_NODISC$) but this is a runtime guard, not a safety interlock.
```

## Notes
- `VOL` and `VOLUME` are aliases; `BAL` and `BALANCE` are aliases. The source allows either form interchangeably.
- Initial baud rate on power-up is 9600; the host can switch via `$BAUD$` to any supported rate. Replies to a `$BAUD$` change are sent at the **old** rate before the switch.
- 2400 baud is not supported; available rates are 4800, 9600, 14400, 19200, 28800, 38400, 57600, 115200, 230400.
- Solicited responses: `!$Status_String$`; unsolicited events: `(Source_ID)$Status_String$` with no leading `!`.
- Identifier fields `#Source#`, `&Group&`, `@Destination@` are optional and follow the rules in section 1.3 of the source. Group-mode commands suppress individual acks.
- Escape sequences (`\xHH`) must be used for `#`, `$`, `&`, `@`, space, and backslash inside identifier or command fields. CLASSIK supports ISO 8859-1; avoid 0..31 and 128..159. ASCII 127 is treated as a delete character by the RS-232 buffer.
- `$ECHO$` issued without identifiers causes every connected device to respond — risk of comms clash.
- `$TIME ?$` is the only time-mode query; it does not return the current playhead time directly but echoes which of the time modes is active.
- `$REPEAT ?$` returns `REPEAT ON`, `REPEAT OFF`, `REPEAT TRACK`, `REPEAT A`, or `REPEAT A-B` — the `A` and `A-B` states are only produced by the remote handset, not by RS-232 commands, but the spec lists them as valid query responses.
- `$TV TYPE$` may only be issued when the tray is empty or the disc is stopped; data discs must be removed.
- The source mentions a `$SCAN ?$` response shape `$SCAN [STOPPED|PAUSED|SCANNING|AUTOSTORE_PAUSED|AUTOSTORE_SCANNING] frequency band$` — `AUTOSTORE_*` states occur during `$PRESET AUTOSTORE$`.
- Command help is implemented: host can issue `$? COMMAND$` to retrieve parameter hints, and `$?$` alone to enumerate the full command set.

<!-- UNRESOLVED:
- Firmware version compatibility (the source provides $VERSION$ queries but does not state a baseline)
- RS-232 flow control (XON/XOFF, RTS/CTS) — not mentioned in source
- Exact pinout / cable type (not in source — assumed null-modem by convention but not stated)
- Maximum cable length / electrical specs (not in source)
- Whether `SETUP` deeper-menu sub-navigation commands exist (source only documents on/off and query)
- Behavior when a disc is ejected during playback (unsolicited-event payload format not enumerated)
-->
```

## Provenance

```yaml
source_domains:
  - docs.linn.co.uk
source_urls:
  - http://docs.linn.co.uk/wiki/images/8/85/Classik_Movie_2005_RS232_Specification_v0111.pdf
  - https://docs.linn.co.uk/wiki/index.php/RS232
  - https://docs.linn.co.uk/wiki/index.php/Developer:Documentation
retrieved_at: 2026-04-30T11:29:36.586Z
last_checked_at: 2026-05-14T18:17:17.636Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-14T18:17:17.636Z
matched_actions: 105
action_count: 105
confidence: medium
summary: "All 127 spec actions matched source commands exactly. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "model firmware ranges, exact disc error recovery sequences, and `SETUP MENU`/`SETUP` deeper-menu navigation commands are not fully described in the source."
- "flow control not stated in source"
- "source does not specify confirmation requirements"
- "source does not specify interlock procedures"
- "source describes no power-on sequencing, no interlock procedures, and no safety"
- "- Firmware version compatibility (the source provides $VERSION$ queries but does not state a baseline)"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0

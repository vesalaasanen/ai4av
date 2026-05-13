---
spec_id: admin/linn-classik-movie
schema_version: ai4av-public-spec-v1
revision: 1
title: "Linn Classik Movie Control Spec"
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
retrieved_at: 2026-04-30T11:29:36.586Z
last_checked_at: 2026-04-30T15:20:38.881Z
generated_at: 2026-04-30T15:20:38.881Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-30T15:20:38.881Z
  matched_actions: 127
  action_count: 127
  confidence: high
  summary: "All 127 spec actions matched source commands exactly."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-30
---

# Linn Classik Movie Control Spec

## Summary
Linn Classik Movie (2005) RS-232 ASCII control interface. Supports serial communication at configurable baud rates with device/group addressing, solicited and unsolicited responses, disc playback, tuner, and pre-amplifier control.

<!-- UNRESOLVED: no TCP/IP or HTTP support documented -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # default; configurable: 4800, 9600, 14400, 19200, 28800, 38400, 57600, 115200, 230400
  data_bits: 7
  parity: even
  stop_bits: 1
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable       # STANDBY command present
- queryable       # STATUS, VERSION, COUNTER, ? variants present
- routable        # LISTEN for source selection
- levelable       # VOL, BAL, MUTE present
```

## Actions
```yaml
# System Commands
- id: id_write
  label: ID Write
  kind: action
  params:
    - name: identifier
      type: string
      description: Product identifier (max 20 chars)

- id: id_remove
  label: ID Remove
  kind: action
  params: []

- id: id_query
  label: ID Query
  kind: action
  params: []

- id: gid_write
  label: GID Write
  kind: action
  params:
    - name: identifier
      type: string
      description: Group identifier

- id: gid_remove
  label: GID Remove
  kind: action
  params:
    - name: identifier
      type: string

- id: gid_query
  label: GID Query
  kind: action
  params: []

- id: baud_set
  label: BAUD Set
  kind: action
  params:
    - name: baudrate
      type: integer
      description: 4800, 9600, 14400, 19200, 28800, 38400, 57600, 115200, 230400

- id: baud_query
  label: BAUD Query
  kind: action
  params: []

- id: reset
  label: RESET
  kind: action
  params: []

- id: echo
  label: ECHO
  kind: action
  params:
    - name: text
      type: string

- id: poll_start
  label: POLL START
  kind: action
  params: []

- id: poll_id
  label: POLL ID
  kind: action
  params: []

- id: poll_sleep
  label: POLL SLEEP
  kind: action
  params:
    - name: product_identifier
      type: string

- id: poll_done
  label: POLL DONE
  kind: action
  params: []

- id: status_query
  label: STATUS Query
  kind: action
  params: []

- id: ir_enable
  label: IR Enable
  kind: action
  params: []

- id: ir_disable
  label: IR Disable
  kind: action
  params: []

- id: ir_query
  label: IR Query
  kind: action
  params: []

- id: init
  label: INIT
  kind: action
  params: []

- id: checksum_query
  label: CHECKSUM Query
  kind: action
  params: []

- id: version_software_query
  label: VERSION SOFTWARE Query
  kind: action
  params: []

- id: version_hardware_query
  label: VERSION HARDWARE Query
  kind: action
  params:
    - name: criteria
      type: string
      description: "Optional: PCAS, PCASb, PCASbt, PCASbtm, PCASbtmRn, or PCASbtmRn serial"

- id: counter_power_query
  label: COUNTER POWER Query
  kind: action
  params: []

- id: counter_mains_query
  label: COUNTER MAINS Query
  kind: action
  params: []

- id: counter_wdt_query
  label: COUNTER WDT Query
  kind: action
  params: []

- id: counter_stack_query
  label: COUNTER STACK Query
  kind: action
  params: []

# Disc Commands
- id: disc_open
  label: OPEN
  kind: action
  params: []

- id: disc_close
  label: CLOSE
  kind: action
  params: []

- id: disc_play
  label: PLAY
  kind: action
  params: []

- id: disc_pause
  label: PAUSE
  kind: action
  params: []

- id: disc_stop
  label: STOP
  kind: action
  params: []

- id: disc_mode_query
  label: MODE Query
  kind: action
  params: []

- id: track_select
  label: TRACK Select
  kind: action
  params:
    - name: number
      type: integer
      description: Track number
    - name: direction
      type: string
      description: "+" (next), "-" (previous), or number

- id: track_query
  label: TRACK Query
  kind: action
  params: []

- id: track_tot_query
  label: TRACK TOT Query
  kind: action
  params: []

- id: discinfo_query
  label: DISCINFO Query
  kind: action
  params: []

- id: search
  label: SEARCH
  kind: action
  params:
    - name: direction
      type: string
      description: "<" (backward), ">" (forward), or "STOP"
    - name: speed
      type: string
      description: "2X, 4X, 6X, or 8X (when direction specified)"

- id: search_query
  label: SEARCH Query
  kind: action
  params: []

- id: time_mode
  label: TIME Mode
  kind: action
  params:
    - name: mode
      type: string
      description: "DISC BEG, DISC END, DISC TOT, TRACK BEG, TRACK END, TRACK TOT, OFF"
    - name: type
      type: string
      description: "DISC or TRACK (required for BEG/END/TOT)"

- id: time_query
  label: TIME Query
  kind: action
  params: []

- id: repeat_on
  label: REPEAT ON
  kind: action
  params: []

- id: repeat_off
  label: REPEAT OFF
  kind: action
  params: []

- id: repeat_begin
  label: REPEAT BEG
  kind: action
  params: []

- id: repeat_end
  label: REPEAT END
  kind: action
  params: []

- id: repeat_track
  label: REPEAT TRACK
  kind: action
  params: []

- id: repeat_query
  label: REPEAT Query
  kind: action
  params: []

- id: skip
  label: SKIP
  kind: action
  params:
    - name: direction
      type: string
      description: "+" or "-"

- id: chapter_select
  label: CHAPTER Select
  kind: action
  params:
    - name: number
      type: integer
      description: Chapter number
    - name: direction
      type: string
      description: "+" (next), "-" (previous), or number

- id: chapter_query
  label: CHAPTER Query
  kind: action
  params: []

- id: chapter_tot_query
  label: CHAPTER TOT Query
  kind: action
  params: []

- id: zoom
  label: ZOOM
  kind: action
  params:
    - name: direction
      type: string
      description: "+" for next level

- id: key
  label: KEY
  kind: action
  params:
    - name: key
      type: string
      description: "UP, DOWN, LEFT, RIGHT, ENTER, AUDIO, SUBTITLE"

- id: angle
  label: ANGLE
  kind: action
  params:
    - name: direction
      type: string
      description: "+"

- id: menu_title
  label: MENU TITLE
  kind: action
  params:
    - name: tt
      type: integer
      description: Title number

- id: menu_dvd
  label: MENU DVD
  kind: action
  params: []

# Tuner Commands
- id: country_set
  label: COUNTRY Set
  kind: action
  params:
    - name: country
      type: string
      description: EUROPE, USA, JAPAN, or RESET

- id: country_query
  label: COUNTRY Query
  kind: action
  params: []

- id: band_set
  label: BAND Set
  kind: action
  params:
    - name: band
      type: string
      description: LW, AM, or FM

- id: band_query
  label: BAND Query
  kind: action
  params: []

- id: tune
  label: TUNE
  kind: action
  params:
    - name: direction
      type: string
      description: "+" or "-" for relative, or absolute frequency
    - name: frequency
      type: integer
      description: Absolute frequency (optional)

- id: tune_query
  label: TUNE Query
  kind: action
  params: []

- id: scan_mode_set
  label: SCAN MODE Set
  kind: action
  params:
    - name: mode
      type: string
      description: SEARCH or SCAN

- id: scan_mode_query
  label: SCAN MODE Query
  kind: action
  params: []

- id: scan_mode_type_set
  label: SCAN MODE TYPE Set
  kind: action
  params:
    - name: type
      type: string
      description: "ALL, SPEECH, MUSIC, or 0-31"

- id: scan_mode_type_query
  label: SCAN MODE TYPE Query
  kind: action
  params: []

- id: scan
  label: SCAN
  kind: action
  params:
    - name: direction
      type: string
      description: "+", "-", or "STOP"

- id: scan_query
  label: SCAN Query
  kind: action
  params: []

- id: preset_store
  label: PRESET STORE
  kind: action
  params:
    - name: name
      type: string

- id: preset_autostore
  label: PRESET AUTOSTORE
  kind: action
  params:
    - name: band
      type: string
      description: AM, FM, or LW

- id: preset_delete
  label: PRESET DELETE
  kind: action
  params:
    - name: name
      type: string

- id: preset_list
  label: PRESET LIST
  kind: action
  params:
    - name: band
      type: string
      description: ALL, AM, FM, or LW

- id: preset_select
  label: PRESET Select
  kind: action
  params:
    - name: direction
      type: string
      description: "+", "-", or preset name/number

- id: preset_query
  label: PRESET Query
  kind: action
  params: []

- id: signal_query
  label: SIGNAL Query
  kind: action
  params: []

- id: mutethreshold_set
  label: MUTETHRESHOLD Set
  kind: action
  params:
    - name: threshold
      type: integer
      description: 0 to 50

- id: mutethreshold_query
  label: MUTETHRESHOLD Query
  kind: action
  params: []

- id: rdsinfo_set
  label: RDSINFO Set
  kind: action
  params:
    - name: enabled
      type: string
      description: "Y, ON, N, or OFF"

- id: rdsinfo_query
  label: RDSINFO Query
  kind: action
  params: []

- id: rdsinfo_name_query
  label: RDSINFO NAME Query
  kind: action
  params: []

- id: rdsinfo_type_query
  label: RDSINFO TYPE Query
  kind: action
  params: []

- id: rdsinfo_text_query
  label: RDSINFO TEXT Query
  kind: action
  params: []

# Pre-amplifier Commands
- id: standby_set
  label: STANDBY Set
  kind: action
  params:
    - name: state
      type: string
      description: "Y, ON, N, OFF, or TOGGLE"

- id: standby_query
  label: STANDBY Query
  kind: action
  params: []

- id: listen_select
  label: LISTEN Select
  kind: action
  params:
    - name: source
      type: string
      description: "DISC, TUNER, AUX1, AUX2, TV, AUXAV, DIG1, DIG2, + (next), or - (previous)"

- id: listen_query
  label: LISTEN Query
  kind: action
  params: []

- id: mute_set
  label: MUTE Set
  kind: action
  params:
    - name: state
      type: string
      description: "Y, ON, N, or OFF"

- id: mute_query
  label: MUTE Query
  kind: action
  params: []

- id: volume_adjust
  label: VOL Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "+" or "-"
    - name: value
      type: integer
      description: Optional step value

- id: volume_set
  label: VOL Set
  kind: action
  params:
    - name: value
      type: integer
      description: 0 to 100

- id: volume_query
  label: VOL Query
  kind: action
  params: []

- id: balance_adjust
  label: BAL Adjust
  kind: action
  params:
    - name: direction
      type: string
      description: "+" or "-"
    - name: value
      type: integer
      description: Optional step value

- id: balance_set
  label: BAL Set
  kind: action
  params:
    - name: value
      type: integer
      description: "-10 to +10"

- id: balance_query
  label: BAL Query
  kind: action
  params: []

- id: surround_select
  label: SURROUND Select
  kind: action
  params:
    - name: direction
      type: string
      description: "+" or "-"
    - name: mode
      type: string
      description: "STEREO, STEREOSU, 3STEREO, PHANTOM, ASMIX, DTSFULL, B"

- id: surround_query
  label: SURROUND Query
  kind: action
  params: []

- id: prologicii_select
  label: PROLOGICII Select
  kind: action
  params:
    - name: direction
      type: string
      description: "+" or "-"
    - name: mode
      type: string
      description: PROLOGIC, MUSIC, MOVIE, or MATRIX

- id: prologicii_query
  label: PROLOGICII Query
  kind: action
  params: []

# Additional Commands
- id: setup_set
  label: SETUP Set
  kind: action
  params:
    - name: state
      type: string
      description: ON or OFF

- id: setup_query
  label: SETUP Query
  kind: action
  params: []

- id: tv_type_set
  label: TV TYPE Set
  kind: action
  params:
    - name: type
      type: string
      description: NATIVE, PAL, or NTSC

- id: tv_type_query
  label: TV TYPE Query
  kind: action
  params: []

- id: video_type_set
  label: VIDEO TYPE Set
  kind: action
  params:
    - name: type
      type: string
      description: SVIDEO, COMPOSITE, YPRPB, or RGB

- id: video_type_query
  label: VIDEO TYPE Query
  kind: action
  params: []

- id: spdifoutput_set
  label: SPDIFOUTPUT Set
  kind: action
  params:
    - name: mode
      type: string
      description: OFF, RAW, or LTRTPCM

- id: spdifoutput_query
  label: SPDIFOUTPUT Query
  kind: action
  params: []
```

## Feedbacks
```yaml
# Initial responses: (Source_ID)(Group_ID)(Destination_ID)!
# Final responses: (Source_ID)(Group_ID)(Destination_ID)!$Status_String$
# Unsolicited: (Source_ID)$Status_String$ (no exclamation mark)
# Error: (Source_ID)(Group_ID)(Destination_ID)!$FAIL sc fn$

- id: power_up_message
  type: string
  values:
    - !$MOVIE$
  description: Unsolicited power-up message

- id: disc_state
  type: enum
  values:
    - INSTANDBY
    - POWEREDUP
    - SETUPMENU
    - TRAY_UNDEFINED
    - OPENING
    - OPENED
    - CLOSING
    - CLOSED
    - DISC_UNDEFINED
    - LOADING
    - NODISC
    - UNKNOWN
    - CDDA
    - VCD
    - SVCD
    - DVD
    - DATA
    - PLAY_UNDEFINED
    - PLAYING
    - PAUSED
    - PRESTOP
    - STOPPED
    - SEARCHING
    - SCANNING
    - DVDMENU
  description: Current disc operational status

- id: repeat_state
  type: enum
  values:
    - ON
    - OFF
    - TRACK
    - A
    - A-B
  description: Current repeat mode

- id: mute_state
  type: enum
  values:
    - ON
    - OFF

- id: standby_state
  type: enum
  values:
    - ON
    - OFF

- id: listen_source
  type: enum
  values:
    - DISC
    - TUNER
    - AUX1
    - AUX2
    - TV
    - AUXAV
    - DIG1
    - DIG2

- id: volume_value
  type: integer
  description: 0 to 100

- id: balance_value
  type: integer
  description: "-10 to +10"

- id: surround_mode
  type: string
  description: STEREO STEREOSU 3STEREO PHANTOM ASMIX DTSFULL B

- id: prologicii_mode
  type: enum
  values:
    - PROLOGIC
    - MUSIC
    - MOVIE
    - MATRIX

- id: setup_state
  type: enum
  values:
    - ON
    - OFF

- id: tv_type
  type: enum
  values:
    - NATIVE
    - PAL
    - NTSC

- id: video_type
  type: enum
  values:
    - SVIDEO
    - COMPOSITE
    - YPRPB
    - RGB

- id: spdifoutput_mode
  type: enum
  values:
    - OFF
    - RAW
    - LTRTPCM

- id: disc_type
  type: string
  description: DISC_CDDA, DISC_HDCD, DISC_VCD, DISC_SVCD, DISC_DVD, DISC_DATA, DISC_UNKNOWN, DISC_LOADING, DISC_NODISC, DISC_UNDEFINED

- id: stream_type
  type: string
  description: STREAM_DOLBY, STREAM_WMA, STREAM_MP3, STREAM_CDDA, STREAM_DTS, STREAM_LPCM, STREAM_MUSICAM, STREAM_AAC, STREAM_PCM, STREAM_DMC, STREAM_MLP, STREAM_UNKNOWN

- id: tuner_frequency
  type: integer
  description: Current frequency in kHz

- id: tuner_band
  type: enum
  values:
    - LW
    - AM
    - FM

- id: scan_status
  type: enum
  values:
    - STOPPED
    - PAUSED
    - SCANNING
    - AUTOSTORE_PAUSED
    - AUTOSTORE_SCANNING

- id: preset_info
  type: string
  description: Preset name, frequency, band

- id: rds_station_name
  type: string
  description: RDS station name (FM only)

- id: rds_programme_type
  type: integer
  description: 0-31 RDS programme type

- id: rds_radio_text
  type: string
  description: RDS radio text (FM only)

- id: signal_strength
  type: integer
  description: 0 to 50

- id: mute_threshold
  type: integer
  description: 0 to 50

- id: status_code
  type: string
  description: Status code from last command

- id: software_version
  type: string
  description: "Format: tpppvvvv (t=P/S, ppp=3-digit ID, vvvv=4-digit version)"

- id: hardware_version
  type: string
  description: "Format: PCASbtmRn with serial (16-digit hex)"

- id: counter_power
  type: string
  description: "Format: days:hours:minutes:seconds"

- id: counter_mains
  type: string
  description: "Format: days:hours:minutes:seconds"

- id: counter_wdt
  type: integer
  description: Watchdog timer reset count

- id: counter_stack
  type: integer
  description: Stack event count

- id: checksum_value
  type: string
  description: Four-digit hex value

- id: ir_state
  type: enum
  values:
    - ON
    - OFF

- id: command_failure
  type: string
  description: "Format: $FAIL sc fn$ - sc=status code, fn=field name"
```

## Variables
```yaml
# No separate variables - query commands return state directly via Feedbacks
```

## Events
```yaml
# Unsolicited responses sent when product state changes:
# Format: (Source_ID)$Status_String$
# No exclamation mark unlike solicited responses

# Disc events: state changes sent automatically during playback
# Tuner events: frequency, RDS info changes
# Pre-amp events: standby, volume, source changes

# Power-up message: !$MOVIE$ sent on product initialization
# UNRESOLVED: full event enumeration not explicitly documented
```

## Macros
```yaml
# Polling sequence for auto-detection (documented in section 2.3.2):
# 1. $POLL START$
# 2. $POLL ID$ → get first device ID
# 3. @dest_id@$POLL SLEEP$ → put device to sleep
# 4. Repeat $POLL ID$ + $POLL SLEEP$ for each device
# 5. $POLL DONE$ → resync all devices

# Repeat A-B: must precede with $REPEAT BEG$ then $REPEAT END$
# UNRESOLVED: no other explicit macros documented
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

RS-232 protocol uses delimited message format: `#Source_ID# &Group_ID& @Destination_ID@ $Command$` with CR/LF line termination.

Command help available via `$? Command$` syntax. Full command list via `$? ?$`.

Products default to 9600 baud. Group mode: products do not acknowledge to avoid comms clash.

Escape sequences: `\xHH` for special characters (32=space, 35=#, 36=$, 38=&, 64=@, 92=\).

Response types: initial response `!` + final response `$Status_String$`, or unsolicited without `!`.

<!-- UNRESOLVED: voltage/power specs not in source -->
<!-- UNRESOLVED: firmware version compatibility not stated -->
<!-- UNRESOLVED: binary protocol not supported — ASCII only -->
<!-- UNRESOLVED: network/TCP support not documented -->

## Provenance

```yaml
source_domains:
  - docs.linn.co.uk
retrieved_at: 2026-04-30T11:29:36.586Z
last_checked_at: 2026-04-30T15:20:38.881Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-30T15:20:38.881Z
matched_actions: 127
action_count: 127
confidence: high
summary: "All 127 spec actions matched source commands exactly."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0

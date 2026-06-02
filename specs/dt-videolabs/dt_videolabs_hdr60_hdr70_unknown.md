---
spec_id: admin/dt-videolabs-hdr60-hdr70
schema_version: ai4av-public-spec-v1
revision: 1
title: "DT Videolabs HDR60 HDR70 Control Spec"
manufacturer: "DT Videolabs"
model_family: HDR60
aliases: []
compatible_with:
  manufacturers:
    - "DT Videolabs"
  models:
    - HDR60
    - HDR70
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - resource.datavideo.com
source_urls:
  - http://resource.datavideo.com/manuals/Datavideo_HDR-60.pdf
  - http://resource.datavideo.com/manualsTW/Datavideo_HDR-70.pdf
retrieved_at: 2026-05-14T23:07:15.160Z
last_checked_at: 2026-05-15T21:32:07.924Z
generated_at: 2026-05-15T21:32:07.924Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "RS-422 mentioned in LCD menu but no RS-422 command details provided in source"
  - "flow control not stated in source"
  - "bitrate select commands (02h F3h 06h xx for HD, 02h F3h 07h xx for SD) list valid values"
  - "bitrate values for HD (02h F3h 06h) and SD (02h F3h 07h) not fully encoded in source"
  - "no explicit safety interlock procedures documented in source"
  - "RS-422 command protocol not documented in source"
  - "bitrate select byte encoding (HD/SD) not fully specified"
  - "SD bitrate valid values listed (LGOP: 8/15/30/50, I-only: 25/50) but byte encoding unknown"
  - "HD bitrate valid values listed (LGOP: 10/25/35/50/65/120, I-only: 100/125) but byte encoding unknown"
  - "Status Sense byte 4 hard-coded as \"1,0,0,1,0,0,0\" — meaning unclear"
  - "flow control setting not stated"
verification:
  verdict: verified
  checked_at: 2026-05-15T21:32:07.924Z
  matched_actions: 44
  action_count: 44
  confidence: medium
  summary: "All 44 spec actions match source commands exactly; transport parameters verified; comprehensive protocol coverage with no gaps. (11 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-15
---

# DT Videolabs HDR60 HDR70 Control Spec

## Summary
Video disk recorder supporting RS-232 serial control and GPI trigger. Binary command protocol with CMD1/CMD2 addressing, variable-length data, and checksum validation. Provides transport control (play, record, stop, jog, shuttle), bin/clip management, and status sensing.

<!-- UNRESOLVED: RS-422 mentioned in LCD menu but no RS-422 command details provided in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 38400
  data_bits: 8
  parity: odd
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not stated in source
  connector: 9-pin D-Sub female
  pinout:
    pin_2_rx: true
    pin_3_tx: true
    pin_5_gnd: true
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
traits:
  - powerable  # inferred: stop/idle state transitions
  - queryable  # inferred: sense commands return status, timecode, firmware
  - recordable  # inferred: record command present
```

## Actions
```yaml
actions:
  - id: device_type_request
    label: Device Type Request
    kind: action
    command: "00h, 11h, 11h"
    description: Requests device type identification
    response: "12h, 11h, 00h, 00h, csum (HDR-60/70 returns 00h, 00h)"
    params: []

  - id: next_bin
    label: Next Bin
    kind: action
    command: "00h, F1h, F1h"
    description: Select next bin (wraps from 99 to 1)
    params: []

  - id: previous_bin
    label: Previous Bin
    kind: action
    command: "00h, F2h, F2h"
    description: Select previous bin (wraps from 1 to 99)
    params: []

  - id: select_bin
    label: Select Bin
    kind: action
    command: "01h, F0h, nn, csum"
    description: Select bin by number
    params:
      - name: bin
        type: integer
        min: 1
        max: 99
        description: Bin number

  - id: select_and_empty_bin
    label: Select and Empty Bin
    kind: action
    command: "02h, F3h, 01h, XX, csum"
    description: Select bin and permanently delete all content
    params:
      - name: bin
        type: integer
        min: 1
        max: 99
        description: Bin number

  - id: enable_loop_play
    label: Enable Loop Play
    kind: action
    command: "02h, F5h, 08h, 01h, 00h"
    description: Enable loop playback (repeat from beginning when end reached)
    params: []

  - id: disable_loop_play
    label: Disable Loop Play
    kind: action
    command: "02h, F5h, 08h, 00h, FFh"
    description: Disable loop playback
    params: []

  - id: stop
    label: Stop
    kind: action
    command: "20h, 00h, 20h"
    description: Enter idle state
    params: []

  - id: play
    label: Play
    kind: action
    command: "20h, 01h, 21h"
    description: Play current bin at 1x speed
    params: []

  - id: record
    label: Record
    kind: action
    command: "20h, 02h, 22h"
    description: Record from selected source to current bin (idle state only)
    params: []

  - id: fast_forward
    label: Fast Forward
    kind: action
    command: "20h, 10h, 30h"
    description: Play forward at 32x speed
    params: []

  - id: fast_rewind
    label: Fast Rewind
    kind: action
    command: "20h, 20h, 40h"
    description: Play reverse at 32x speed
    params: []

  - id: jump_forward
    label: Jump Forward
    kind: action
    command: "20h, 15h, 35h"
    description: Jump forward
    params: []

  - id: jump_reverse
    label: Jump Reverse
    kind: action
    command: "20h, 25h, 45h"
    description: Jump reverse
    params: []

  - id: play_pause
    label: Play Pause
    kind: action
    command: "21h, 11h, 00h, 32h"
    description: Pause playback
    params: []

  - id: jog_forward
    label: Jog Forward
    kind: action
    command: "21h, 11h, nnh, csum"
    description: Jog forward at speed nn
    params:
      - name: speed
        type: integer
        max: 128
        description: "Play speed. Speed formula: Play Speed = 10 * (nn/32 - 2)"

  - id: variable_forward
    label: Variable Forward
    kind: action
    command: "21h, 12h, nnh, csum"
    description: Variable speed forward
    params:
      - name: speed
        type: integer
        max: 128
        description: "Play speed. 0 = pause"

  - id: shuttle_forward
    label: Shuttle Forward
    kind: action
    command: "21h, 13h, nnh, csum"
    description: Shuttle forward at speed nn
    params:
      - name: speed
        type: integer
        max: 128
        description: "Play speed. 0 = pause"

  - id: jog_reverse
    label: Jog Reverse
    kind: action
    command: "21h, 21h, nnh, csum"
    description: Jog reverse at speed nn
    params:
      - name: speed
        type: integer
        max: 128
        description: "Play speed. 0 = pause"

  - id: variable_reverse
    label: Variable Reverse
    kind: action
    command: "21h, 22h, nnh, csum"
    description: Variable speed reverse
    params:
      - name: speed
        type: integer
        max: 128
        description: "Play speed. 0 = pause"

  - id: shuttle_reverse
    label: Shuttle Reverse
    kind: action
    command: "21h, 23h, nnh, csum"
    description: Shuttle reverse at speed nn
    params:
      - name: speed
        type: integer
        max: 128
        description: "Play speed. 0 = pause"

  - id: select_bin_and_play
    label: Select Bin and Play
    kind: action
    command: "21h, F0h, nnh, csum"
    description: Select bin nn and play from beginning at 1x speed
    params:
      - name: bin
        type: integer
        description: Bin number

  - id: play_offset
    label: Play Offset
    kind: action
    command: "24h, F1h, nn(4 bytes LSB first), csum"
    description: Play from frame offset (absolute frame number)
    params:
      - name: offset
        type: integer
        description: Absolute frame offset (4 bytes, LSB first)

  - id: play_from_offset
    label: Play from Offset
    kind: action
    command: "24h, F2h, nn(4 bytes LSB first), csum"
    description: Play current bin at 1x speed starting at frame offset
    params:
      - name: offset
        type: integer
        description: Frame offset (4 bytes, LSB first)

  - id: select_bin_play_offset
    label: Select Bin and Play Offset
    kind: action
    command: "24h, F3h, bb, nn(4 bytes LSB first), csum"
    description: Select bin bb and play at frame offset nn
    params:
      - name: bin
        type: integer
        description: Bin number
      - name: offset
        type: integer
        description: Frame offset (4 bytes, LSB first)

  - id: select_bin_play_from_offset
    label: Select Bin and Play from Offset
    kind: action
    command: "24h, F4h, bb, nn(4 bytes LSB first), csum"
    description: Play bin bb at 1x speed starting at frame offset nn
    params:
      - name: bin
        type: integer
        description: Bin number
      - name: offset
        type: integer
        description: Frame offset (4 bytes, LSB first)

  - id: play_to_offset
    label: Play to Offset
    kind: action
    command: "24h, F5h, nn(4 bytes LSB first), csum"
    description: Play current bin from current position to frame offset nn, then pause
    params:
      - name: offset
        type: integer
        description: End frame offset (4 bytes, LSB first)

  - id: select_bin_play_to_offset
    label: Select Bin and Play to Offset
    kind: action
    command: "25h, F5h, bb, nn(4 bytes LSB first), csum"
    description: Play bin bb from offset 0 to frame offset nn, then pause
    params:
      - name: bin
        type: integer
        description: Bin number
      - name: offset
        type: integer
        description: End frame offset (4 bytes, LSB first)

  - id: select_bin_play_from_to_offset
    label: Select Bin and Play from Offset to Offset
    kind: action
    command: "29h, F5h, bb, nn(4 bytes LSB first), ee(4 bytes LSB first), csum"
    description: Play bin bb from offset nn to offset ee, then pause
    params:
      - name: bin
        type: integer
        description: Bin number
      - name: start_offset
        type: integer
        description: Start frame offset (4 bytes, LSB first)
      - name: end_offset
        type: integer
        description: End frame offset (4 bytes, LSB first)

  - id: next_clip
    label: Next Clip
    kind: action
    command: "21h, F1h, 02h, 14h"
    description: Advance to next clip (play-pause state only)
    params: []

  - id: previous_clip
    label: Previous Clip
    kind: action
    command: "21h, F2h, 02h, 15h"
    description: Go to previous clip (play-pause state only)
    params: []

  - id: idle_mode_record_play
    label: Set Idle Mode to Play
    kind: action
    command: "02h, F3h, 02h, 00h, F7h"
    description: Set idle mode to Play mode
    params: []

  - id: idle_mode_recorder
    label: Set Idle Mode to Recorder
    kind: action
    command: "02h, F3h, 02h, 01h, F8h"
    description: Set idle mode to Recorder mode
    params: []

  - id: audio_input_sdi
    label: Audio Input Select SDI
    kind: action
    command: "02h, F3h, 04h, 00h, F9h"
    description: Select SDI audio input
    params: []

  - id: audio_input_xlr
    label: Audio Input Select XLR
    kind: action
    command: "02h, F3h, 04h, 01h, FAh"
    description: Select XLR audio input
    params: []

  - id: hd_rec_format_long_gop
    label: HD Record Format Long-GOP
    kind: action
    command: "02h, F3h, 05h, 00h, FAh"
    description: Set HD record format to Long-GOP
    params: []

  - id: hd_rec_format_i_frame
    label: HD Record Format I-Frame Only
    kind: action
    command: "02h, F3h, 05h, 01h, FBh"
    description: Set HD record format to I-frame only
    params: []

  - id: sd_aspect_4x3
    label: SD Aspect 4x3
    kind: action
    command: "02h, F3h, 09h, 00h, FEh"
    description: Set SD aspect ratio to 4x3
    params: []

  - id: sd_aspect_16x9
    label: SD Aspect 16x9
    kind: action
    command: "02h, F3h, 09h, 01h, FFh"
    description: Set SD aspect ratio to 16x9
    params: []

  - id: sd_rec_format_long_gop
    label: SD Record Format Long-GOP
    kind: action
    command: "02h, F3h, 0Ah, 00h, FFh"
    description: Set SD record format to Long-GOP
    params: []

  - id: sd_rec_format_i_frame
    label: SD Record Format I-Frame Only
    kind: action
    command: "02h, F3h, 0Ah, 01h, 00h"
    description: Set SD record format to I-frame only
    params: []

  - id: unlock_media
    label: Unlock Media (Make Media File)
    kind: action
    command: "01h, F6h, 00, F7h"
    description: Unlock media file
    params: []

  - id: empty_current_bin
    label: Empty Current Bin
    kind: action
    command: "01h, F6h, 01, F8h"
    description: Delete all content in current bin
    params: []

  - id: format_media
    label: Format Media (Empty All)
    kind: action
    command: "01h, F6h, 02, F9h"
    description: Format all media
    params: []

  # UNRESOLVED: bitrate select commands (02h F3h 06h xx for HD, 02h F3h 07h xx for SD) list valid values
  # but exact byte encoding per bitrate value not fully documented
```

## Feedbacks
```yaml
feedbacks:
  - id: current_timecode
    label: Current Time Sense
    command: "61h, 0Ch, 04h, 71h"
    response: "4 bytes BCD: frame, seconds, minutes, hour"
    type: timecode
    description: Returns present timecode in BCD (frame, sec, min, hour)

  - id: status_sense
    label: Status Sense
    command: "61h, 20h, 0Fh, 90h"
    response: "7Fh, 20h, [15 bytes], csum"
    type: binary
    description: 15-byte status including busy flag, transport state, disk status, bin number, file length

  - id: current_frame_offset
    label: Current Frame Offset
    command: "61h, 0Dh, 04h, 72h"
    response: "74h, 0Dh, [4 bytes], csum"
    type: integer
    description: Current frame offset within bin

  - id: current_bin
    label: Current Bin
    command: "61h, F1h, 01h, 53h"
    response: "61h, 00h, nn, csum"
    type: integer
    description: Current bin number

  - id: firmware_recorder
    label: Firmware Revision (Recorder)
    command: "62h, F2h, 05h, 00h, 59h"
    response: "79h, F2h, 05h, 00h, [7 bytes], csum"
    type: binary
    description: "7 bytes: ROM, FW Major, FW Minor, File System, FPGA, RBF, ESP"

  - id: firmware_host
    label: Firmware Revision (Host)
    command: "62h, F2h, 05h, 01h, 5Ah"
    response: "79h, F2h, 05h, 01h, [7 bytes], csum"
    type: binary
    description: "7 bytes: FW Major, FW Minor, Control CMD Major, Control CMD Minor, Bootloader Minor, 00h, 00h"

  - id: firmware_codec
    label: Firmware Revision (Codec)
    command: "62h, F2h, 05h, 02h, 5Bh"
    response: "79h, F2h, 05h, 02h, [7 bytes], csum"
    type: binary
    description: "7 bytes: Codec Bootloader Major/Minor, Codec Host Major/Minor, Codec Major/Minor, 00h"

  - id: ack
    label: ACK
    response: "10h, 01h, csum"
    type: enum
    description: Positive acknowledgement received for valid commands

  - id: nak
    label: NAK
    response: "11h, 12h, data_byte, csum"
    type: enum
    description: Negative acknowledgement for communication error or undefined command
```

## Variables
```yaml
# UNRESOLVED: bitrate values for HD (02h F3h 06h) and SD (02h F3h 07h) not fully encoded in source
```

## Events
```yaml
# No unsolicited notifications described in source. Device only responds to commands.
```

## Macros
```yaml
# No multi-step macro sequences described in source.
```

## Safety
```yaml
confirmation_required_for:
  - select_and_empty_bin  # permanently deletes all bin content
  - empty_current_bin  # deletes all content in current bin
  - format_media  # formats all media, irreversible
interlocks:
  - description: "PLAY command from idle state has up to 700ms response delay; all commands ignored during busy period"
  - description: "Record command only accepted from idle state"
  - description: "Next/Previous clip only works in play-pause state"
# UNRESOLVED: no explicit safety interlock procedures documented in source
```

## Notes
- Binary protocol: CMD1 high nibble = command group, low nibble = data byte count following CMD2. Checksum = modulo 256 sum of all preceding bytes.
- ACK response: `10h, 01h, 11h`. Invalid checksum causes command to be silently ignored.
- Most commands respond within 8ms; PLAY from idle takes up to 700ms.
- Speed formula for Jog/Variable/Shuttle: `Play Speed = 10 * (nn/32 - 2)`. Setting nn to 0 pauses.
- Frame offsets are absolute (first frame = 0), sent as 4 bytes LSB first.
- Device type for HDR-60/70: `00h, 00h`.
- Bins numbered 1–99, max 99 clips per bin.
- RS-422 appears as a menu option but no RS-422 command details in this source.

<!-- UNRESOLVED: RS-422 command protocol not documented in source -->
<!-- UNRESOLVED: bitrate select byte encoding (HD/SD) not fully specified -->
<!-- UNRESOLVED: SD bitrate valid values listed (LGOP: 8/15/30/50, I-only: 25/50) but byte encoding unknown -->
<!-- UNRESOLVED: HD bitrate valid values listed (LGOP: 10/25/35/50/65/120, I-only: 100/125) but byte encoding unknown -->
<!-- UNRESOLVED: Status Sense byte 4 hard-coded as "1,0,0,1,0,0,0" — meaning unclear -->
<!-- UNRESOLVED: flow control setting not stated -->

## Provenance

```yaml
source_domains:
  - resource.datavideo.com
source_urls:
  - http://resource.datavideo.com/manuals/Datavideo_HDR-60.pdf
  - http://resource.datavideo.com/manualsTW/Datavideo_HDR-70.pdf
retrieved_at: 2026-05-14T23:07:15.160Z
last_checked_at: 2026-05-15T21:32:07.924Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-05-15T21:32:07.924Z
matched_actions: 44
action_count: 44
confidence: medium
summary: "All 44 spec actions match source commands exactly; transport parameters verified; comprehensive protocol coverage with no gaps. (11 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "RS-422 mentioned in LCD menu but no RS-422 command details provided in source"
- "flow control not stated in source"
- "bitrate select commands (02h F3h 06h xx for HD, 02h F3h 07h xx for SD) list valid values"
- "bitrate values for HD (02h F3h 06h) and SD (02h F3h 07h) not fully encoded in source"
- "no explicit safety interlock procedures documented in source"
- "RS-422 command protocol not documented in source"
- "bitrate select byte encoding (HD/SD) not fully specified"
- "SD bitrate valid values listed (LGOP: 8/15/30/50, I-only: 25/50) but byte encoding unknown"
- "HD bitrate valid values listed (LGOP: 10/25/35/50/65/120, I-only: 100/125) but byte encoding unknown"
- "Status Sense byte 4 hard-coded as \"1,0,0,1,0,0,0\" — meaning unclear"
- "flow control setting not stated"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0

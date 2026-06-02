---
spec_id: admin/tascam-cdrw901
schema_version: ai4av-public-spec-v1
revision: 1
title: "Tascam CD-RW901 Control Spec"
manufacturer: Tascam
model_family: CD-RW901
aliases: []
compatible_with:
  manufacturers:
    - Tascam
  models:
    - CD-RW901
    - CD-RW901SL
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - tascam.eu
  - cf.tascam.com
  - manua.ls
source_urls:
  - "https://www.tascam.eu/en/docs/CD-RW901%20RS-232C_Protocol%20v100.pdf"
  - https://cf.tascam.com/wp-content/uploads/downloads/products/old/833/rs-232c_protocol_cd-rw901mk2_v100_e.pdf
  - https://www.tascam.eu/en/docs/CD-RW901SL_Manual.pdf
  - https://www.manua.ls/tascam/cd-rw901/manual
retrieved_at: 2026-05-14T02:48:57.845Z
last_checked_at: 2026-06-02T22:15:34.737Z
generated_at: 2026-06-02T22:15:34.737Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "no standalone Variables section in source - all settable params are Actions"
  - "populated from unsolicited status commands above"
  - "no macro sequences described in source"
  - "no safety warnings or interlock procedures in source"
  - "port number not stated (configured on device panel)"
  - "voltage/current/power specs not in control protocol section"
  - "firmware version compatibility not stated in source"
  - "binary encoding for error/caution codes not detailed — only ASCII return format shown"
verification:
  verdict: verified
  checked_at: 2026-06-02T22:15:34.737Z
  matched_actions: 30
  action_count: 30
  confidence: medium
  summary: "All 30 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-05-14
---

# Tascam CD-RW901 Control Spec

## Summary
Professional CD recorder with RS-232C serial control interface. Commands ASCII-based, framed by LF/CR. Supports transport control, playback mode selection, track search, text/title writing, pitch/key control, digital volume, and comprehensive status sensing. Machine ID fixed at 0. No authentication required.

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 9600  # default; also supports 4800/19200/38400 - set on device
  data_bits: 8
  parity: none  # also supports odd/even - set on device
  stop_bits: 1  # also supports 2 - set on device
  flow_control: none
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- powerable
- routable
- queryable
- levelable
```

## Actions
```yaml
- id: stop
  label: Stop
  kind: action
  params: []
- id: play
  label: Play
  kind: action
  params: []
- id: record
  label: Record
  kind: action
  params:
    - name: mode
      type: integer
      description: |
        01 = Record Ready
        02 = Track Mark
        03 = Input Monitor
- id: ready
  label: Ready
  kind: action
  params:
    - name: mode
      type: integer
      description: "01 = Ready On"
- id: shuttle
  label: Shuttle
  kind: action
  params:
    - name: direction
      type: integer
      description: "00 = Forward, 01 = Reverse"
- id: tray
  label: Tray Open/Close
  kind: action
  params: []
- id: track_index_skip
  label: Track/Index Skip
  kind: action
  params:
    - name: type
      type: integer
      description: "00 = Next Track, 01 = Previous Track, 10 = Next Index, 11 = Previous Index"
- id: call
  label: Call
  kind: action
  params: []
- id: auto_cue_level_preset
  label: Auto Cue Level Preset
  kind: action
  params:
    - name: level
      type: integer
      description: "0=-24dB, 1=-30dB, 2=-36dB, 3=-42dB, 4=-48dB, 5=-54dB, 6=-60dB, 7=-66dB, 8=-72dB, F=Sense"
- id: auto_track_level_preset
  label: Auto Track Level Preset
  kind: action
  params:
    - name: level
      type: integer
      description: "0=-24dB, 1=-30dB, 2=-36dB, 3=-42dB, 4=-48dB, 5=-54dB, 6=-60dB, 7=-66dB, 8=-72dB, F=Sense"
- id: direct_track_search_preset
  label: Direct Track Search Preset
  kind: action
  params:
    - name: track
      type: integer
      description: "4-byte BCD track number (max 99 audio, 999 MP3)"
- id: pitch_data_preset
  label: Pitch Data Preset
  kind: action
  params:
    - name: pitch
      type: integer
      description: "4-byte: N1=tens, N2=ones, N3=decimal, 0=positive 1=negative. Range ±16.0%. FF=Sense"
- id: auto_track_time_preset
  label: Auto Track Time Preset
  kind: action
  params:
    - name: minutes
      type: integer
      description: "N1= tens digit, N2= ones digit. Range 1-10 min. FF=Sense"
- id: sync_rec_level_preset
  label: Sync Rec Level Preset
  kind: action
  params:
    - name: level
      type: integer
      description: "0=-24dB, 1=-30dB, 2=-36dB, 3=-42dB, 4=-48dB, 5=-54dB, 6=-60dB, 7=-66dB, 8=-72dB, F=Sense"
- id: text_preset
  label: Text Preset
  kind: action
  params:
    - name: target
      type: integer
      description: "4-byte BCD: 0000=disc title, 0001-0099=track title"
    - name: title
      type: string
      description: "Up to 80 single-byte alphanumeric characters"
- id: time_search_preset
  label: Time Search Preset
  kind: action
  params:
    - name: track
      type: integer
      description: "Data 1-4: track number BCD"
    - name: time
      type: integer
      description: "Data 5-12: minutes/seconds BCD, Data 11-12 must be 0"
- id: key_control_data_preset
  label: Key Control Data Preset
  kind: action
  params:
    - name: direction
      type: integer
      description: "0=Key Up, 1=Key Down. Range 0-6 semitones"
- id: fade_in_out_time_preset
  label: Fade In/Out Time Preset
  kind: action
  params:
    - name: in_time
      type: integer
      description: "N1= tens digit, N2= ones digit. Range 1-30s"
    - name: out_time
      type: integer
      description: "N3= tens digit, N4= ones digit. Range 1-30s"
- id: digital_volume_data_preset
  label: Digital Volume Data Preset
  kind: action
  params:
    - name: volume
      type: integer
      description: "4-byte: N1=tens, N2=ones, N3=decimal, 0=positive 1=negative. Range -54dB to +18dB. AAAA=-∞dB. FF=Sense"
- id: auto_cue_select
  label: Auto Cue Select
  kind: action
  params:
    - name: enabled
      type: integer
      description: "00=Off, 01=On. FF=Sense"
- id: auto_track_select
  label: Auto Track Select
  kind: action
  params:
    - name: mode
      type: integer
      description: "00=Off, 01=On(Level), 02=On(Digital Direct), 03=On(Time). FF=Sense"
- id: eom_track_time_preset
  label: EOM Track Time Preset
  kind: action
  params:
    - name: seconds
      type: integer
      description: "00=Off, N1N2=1-99 seconds. FF=Sense"
- id: eom_disc_time_preset
  label: EOM Disc Time Preset
  kind: action
  params:
    - name: seconds
      type: integer
      description: "00=Off, N1N2=1-99 seconds. FF=Sense"
- id: pitch_control_select
  label: Pitch Control Select
  kind: action
  params:
    - name: enabled
      type: integer
      description: "00=Off, 01=On. FF=Sense"
- id: auto_ready_select
  label: Auto Ready Select
  kind: action
  params:
    - name: enabled
      type: integer
      description: "00=Off, 01=On. FF=Sense"
- id: repeat_select
  label: Repeat Select
  kind: action
  params:
    - name: enabled
      type: integer
      description: "00=Off, 01=On. FF=Sense"
- id: sync_rec_select
  label: Sync Rec Select
  kind: action
  params:
    - name: enabled
      type: integer
      description: "00=Off, 01=On. FF=Sense"
- id: incr_play_select
  label: Incremental Play Select
  kind: action
  params:
    - name: enabled
      type: integer
      description: "00=Off, 01=On. FF=Sense"
- id: key_control_select
  label: Key Control Select
  kind: action
  params:
    - name: enabled
      type: integer
      description: "00=Off, 01=On. FF=Sense"
- id: remote_local_select
  label: Remote/Local Select
  kind: action
  params:
    - name: mode
      type: integer
      description: "00=Remote (panel disabled), 01=Local (panel enabled). FF=Sense"
```

## Feedbacks
```yaml
- id: information_return
  label: Information Return
  type: object
  fields:
    - name: version
      type: string
      description: "Data 1-4: software version BCD (e.g. 0100 = v1.00)"
- id: auto_cue_level_return
  label: Auto Cue Level Return
  type: enum
  values:
    - "-24dB"
    - "-30dB"
    - "-36dB"
    - "-42dB"
    - "-48dB"
    - "-54dB"
    - "-60dB"
    - "-66dB"
    - "-72dB"
- id: auto_track_level_return
  label: Auto Track Level Return
  type: enum
  values:
    - "-24dB"
    - "-30dB"
    - "-36dB"
    - "-42dB"
    - "-48dB"
    - "-54dB"
    - "-60dB"
    - "-66dB"
    - "-72dB"
- id: pitch_data_return
  label: Pitch Data Return
  type: object
  fields:
    - name: pitch
      type: string
      description: "N1=tens, N2=ones, N3=decimal, 0=positive 1=negative"
- id: auto_track_time_return
  label: Auto Track Time Return
  type: object
  fields:
    - name: minutes
      type: integer
      description: "N1=tens digit, N2=ones digit"
- id: sync_rec_level_return
  label: Sync Rec Level Return
  type: enum
  values:
    - "-24dB"
    - "-30dB"
    - "-36dB"
    - "-42dB"
    - "-48dB"
    - "-54dB"
    - "-60dB"
    - "-66dB"
    - "-72dB"
- id: text_preset_acknowledge
  label: Text Preset Acknowledge
  type: null
  description: "Returned when title is successfully written"
- id: key_control_data_return
  label: Key Control Data Return
  type: object
  fields:
    - name: direction
      type: integer
      description: "0=Key Up, 1=Key Down"
    - name: semitones
      type: integer
      description: "0-6"
- id: fade_in_out_time_return
  label: Fade In/Out Time Return
  type: object
  fields:
    - name: in_time
      type: integer
      description: "N1=tens, N2=ones"
    - name: out_time
      type: integer
      description: "N3=tens, N4=ones"
- id: digital_volume_data_return
  label: Digital Volume Data Return
  type: object
  fields:
    - name: volume
      type: string
      description: "N1=tens, N2=ones, N3=decimal, 0=positive 1=negative. AAAA=-∞dB"
- id: auto_cue_select_return
  label: Auto Cue Select Return
  type: enum
  values:
    - Auto Cue Off
    - Auto Cue On
- id: auto_track_select_return
  label: Auto Track Select Return
  type: enum
  values:
    - Auto Track Off
    - Auto Track On (Level)
    - Auto Track On (Digital Direct)
    - Auto Track On (Time)
- id: eom_track_time_return
  label: EOM Track Time Return
  type: object
  fields:
    - name: seconds
      type: integer
      description: "00=Off, N1N2=seconds"
- id: eom_disc_time_return
  label: EOM Disc Time Return
  type: object
  fields:
    - name: seconds
      type: integer
      description: "00=Off, N1N2=seconds"
- id: pitch_control_select_return
  label: Pitch Control Select Return
  type: enum
  values:
    - Pitch Control Off
    - Pitch Control On
- id: auto_ready_select_return
  label: Auto Ready Select Return
  type: enum
  values:
    - Auto Ready Off
    - Auto Ready On
- id: repeat_select_return
  label: Repeat Select Return
  type: enum
  values:
    - Repeat Off
    - Repeat On
- id: sync_rec_select_return
  label: Sync Rec Select Return
  type: enum
  values:
    - Sync Rec Off
    - Sync Rec On
- id: incr_play_select_return
  label: Incremental Play Select Return
  type: enum
  values:
    - INCR Play Off
    - INCR Play On
- id: key_control_select_return
  label: Key Control Select Return
  type: enum
  values:
    - Key Control Off
    - Key Control On
- id: remote_local_select_return
  label: Remote/Local Select Return
  type: enum
  values:
    - Remote
    - Local
- id: play_mode_return
  label: Play Mode Return
  type: enum
  values:
    - Continue
    - Single
    - Program (Data Empty)
    - Program
    - Random
- id: mecha_status_return
  label: Mecha Status Return
  type: enum
  values:
    - No Disc
    - Tray (opening/closing)
    - Open
    - Stop
    - Play
    - Ready On
    - Monitor
    - Record
    - Record Ready
    - TOC Writing
- id: isrc_return
  label: ISRC Return
  type: string
  description: "12-byte ISRC code, or all zeros if not stored"
- id: track_no_return
  label: Track No. Return
  type: object
  fields:
    - name: eom_status
      type: integer
      description: "00=not shown, 01=EOM displayed"
    - name: number
      type: integer
      description: "0000=stopped not cued, 0001-0999=track, 1001-1099=group (1000 added)"
- id: disc_status_return
  label: Disc Status Return
  type: object
  fields:
    - name: present
      type: integer
      description: "00=not present, 01=present"
    - name: type
      type: integer
      description: "00=CD-DA, 01=CD-R Audio, 02=CD-RW Audio, 10=CD-Data MP3, 11=CD-R Data, 12=CD-RW Data"
- id: current_track_information_return
  label: Current Track Information Return
  type: object
  fields:
    - name: track
      type: integer
      description: "4-byte BCD track number"
    - name: minutes
      type: integer
      description: "Data 5-8: track time minutes BCD"
    - name: seconds
      type: integer
      description: "Data 9-10: track time seconds BCD"
- id: current_track_time_return
  label: Current Track Time Return
  type: object
  fields:
    - name: mode
      type: integer
      description: "00=Track elapsed, 01=Track remaining, 02=Disc elapsed, 03=Disc remaining"
    - name: minutes
      type: integer
      description: "Data 3-6: minutes BCD"
    - name: seconds
      type: integer
      description: "Data 7-8: seconds BCD"
- id: text_return
  label: Text Return
  type: string
  description: "0-80 single-byte alphanumeric characters"
- id: total_track_no_time_return
  label: Total Track No./Total Time Return
  type: object
  fields:
    - name: total_tracks
      type: integer
      description: "Data 1-4: BCD. 0000=blank disc or no disc"
    - name: minutes
      type: integer
      description: "Data 5-8: total minutes BCD"
    - name: seconds
      type: integer
      description: "Data 9-10: total seconds BCD"
- id: pgm_total_track_no_time_return
  label: PGM Total Track No./Total Time Return
  type: object
  fields:
    - name: total_tracks
      type: integer
      description: "Data 1-4: BCD. 0000=no program created"
    - name: minutes
      type: integer
      description: "Data 5-8: total minutes BCD"
    - name: seconds
      type: integer
      description: "Data 9-10: total seconds BCD"
- id: keyboard_type_return
  label: Keyboard Type Return
  type: enum
  values:
    - Japanese Keyboard
    - US Keyboard
- id: error_sense_request
  label: Error Sense Request
  type: event
  description: "Unsolicited; transmitted when device enters error condition"
- id: caution_sense_request
  label: Caution Sense Request
  type: event
  description: "Unsolicited; transmitted when device enters caution condition"
- id: illegal_status
  label: Illegal Status
  type: event
  description: "Returned when invalid command or data received"
- id: power_on_status
  label: Power On Status
  type: event
  description: "Unsolicited; transmitted when device powers on"
- id: changed_status
  label: Changed Status
  type: event
  description: "Unsolicited; transmitted when device state changes"
  fields:
    - name: type
      type: integer
      description: "00=Mechanical status changed, 03=Track/EOM status changed"
- id: error_sense_return
  label: Error Sense Return
  type: object
  fields:
    - name: code
      type: string
      description: "Format N1-N2N3. Codes: 1-01=Rec Error, 1-02=Drive Error, 1-12=Disc Error, 1-1F=Format Error"
- id: caution_sense_return
  label: Caution Sense Return
  type: object
  fields:
    - name: code
      type: string
      description: "Format N1-N2N3. Codes: 1-04=Sur? Text, 1-05=Tray Error, 1-06=Disc Full, 1-07=Track Full, 1-09=D-In Unlock, 1-0B=Can't REC, 1-0F=Can't Edit, 1-13=Can't Select, 1-15=Not Fs44.1k, 1-16=Text Full, 1-19=PGM Full, 1-1A=PGM Empty, 1-1B=Ext CLK Err, 1-1D=Not Audio, 1-1E=Decode Error"
```

## Variables
```yaml
# UNRESOLVED: no standalone Variables section in source - all settable params are Actions
```

## Events
```yaml
# UNRESOLVED: populated from unsolicited status commands above
```

## Macros
```yaml
# UNRESOLVED: no macro sequences described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: no safety warnings or interlock procedures in source
```

## Notes

**Command timing:** minimum 20ms interval between commands.

**ACK policy:** device does NOT send ACK for transport or preset commands. Device sends return only for sense queries.

**Machine ID:** fixed at 0. Commands with other IDs are ignored.

**Error response:** unsupported commands return `ILLEGAL [F2]`.

**Disc capacity:** audio CD max 99 tracks; MP3 CD max 999 tracks.

**Baud rate config:** selectable on device panel (4800/9600/19200/38400). Default is 9600.

**RTS/CTS:** loopback-connected within device. External controller must handle accordingly if using hardware flow control.
<!-- UNRESOLVED: port number not stated (configured on device panel) -->
<!-- UNRESOLVED: voltage/current/power specs not in control protocol section -->
<!-- UNRESOLVED: firmware version compatibility not stated in source -->
<!-- UNRESOLVED: binary encoding for error/caution codes not detailed — only ASCII return format shown -->

## Provenance

```yaml
source_domains:
  - tascam.eu
  - cf.tascam.com
  - manua.ls
source_urls:
  - "https://www.tascam.eu/en/docs/CD-RW901%20RS-232C_Protocol%20v100.pdf"
  - https://cf.tascam.com/wp-content/uploads/downloads/products/old/833/rs-232c_protocol_cd-rw901mk2_v100_e.pdf
  - https://www.tascam.eu/en/docs/CD-RW901SL_Manual.pdf
  - https://www.manua.ls/tascam/cd-rw901/manual
retrieved_at: 2026-05-14T02:48:57.845Z
last_checked_at: 2026-06-02T22:15:34.737Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T22:15:34.737Z
matched_actions: 30
action_count: 30
confidence: medium
summary: "All 30 spec actions traced to source (dip-safe re-verify). (8 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "no standalone Variables section in source - all settable params are Actions"
- "populated from unsolicited status commands above"
- "no macro sequences described in source"
- "no safety warnings or interlock procedures in source"
- "port number not stated (configured on device panel)"
- "voltage/current/power specs not in control protocol section"
- "firmware version compatibility not stated in source"
- "binary encoding for error/caution codes not detailed — only ASCII return format shown"
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0

---
spec_id: admin/louth-vdcp
schema_version: ai4av-public-spec-v1
revision: 1
title: "Louth VDCP Control Spec"
manufacturer: Louth
model_family: "Louth VDCP"
aliases: []
compatible_with:
  manufacturers:
    - Louth
  models:
    - "Louth VDCP"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - imaginecommunications.com
source_urls:
  - https://imaginecommunications.com/content/uploads/2024/11/VDCP_Protocol_Guide_Revision_20_20230531.pdf
retrieved_at: 2026-04-30T04:46:15.174Z
last_checked_at: 2026-04-25T21:06:26.422Z
generated_at: 2026-04-25T21:06:26.422Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps: []
verification:
  verdict: verified
  checked_at: 2026-04-25T21:06:26.422Z
  matched_actions: 76
  action_count: 76
  confidence: high
  summary: "All 76 spec actions match semantically to source command definitions, transport parameters verified verbatim, comprehensive protocol coverage confirmed."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-19
---

# Louth VDCP Control Spec

## Summary
Louth Video Disk Communications Protocol (VDCP) is a serial control protocol for video disk systems. The protocol operates over RS-422 full-duplex serial at 38.4 kb/s and uses a binary message format with STX prefix, byte count, command bytes, optional data, and 2's complement checksum. Commands are organized into six types: System, Immediate, Preset/Select, Sense Request, Deferred/Timeline, and Macro. The protocol supports video playback, recording, cueing, and archive management through a comprehensive command set.

<!-- UNRESOLVED: device model variants not specified in source -->

## Transport
```yaml
protocols:
  - serial
serial:
  baud_rate: 38400  # 38.4 kb/s as stated in source
  data_bits: 8
  parity: odd
  stop_bits: 1
  flow_control: null  # UNRESOLVED: flow control not specified in source
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
# Supported traits inferred from command types present:
- powerable       # video disk play/record/stop commands present
- routable        # input/output selection commands present (2X.38, 2X.39)
- queryable       # sense request commands present (3X.05, 3X.06, 3X.07, etc.)
- levelable       # audio level commands present (2X.34, 2X.35)
```

## Actions
```yaml
# System Commands (0X)
- id: local_disable
  label: Local Disable
  kind: action
  params: []

- id: local_enable
  label: Local Enable
  kind: action
  params: []

- id: delete_from_archive
  label: Delete From Archive
  kind: action
  params:
    - name: id
      type: string
      description: 8-character ID to delete from archive
    - name: tape_id
      type: string
      description: Optional tape ID and length byte

- id: delete_protect_id
  label: Delete Protect ID
  kind: action
  params:
    - name: id
      type: string
      description: 8-character ID to protect from deletion

- id: undelete_protect_id
  label: Undelete Protect ID
  kind: action
  params:
    - name: id
      type: string
      description: 8-character ID to unprotect

# Immediate Commands (1X)
- id: stop
  label: Stop
  kind: action
  params: []

- id: play
  label: Play
  kind: action
  params:
    - name: prepared_file_handle
      type: integer
      description: Optional prepared file handle (only if Prepare ID To Play was issued)

- id: record
  label: Record
  kind: action
  params: []

- id: freeze
  label: Freeze
  kind: action
  params: []

- id: still
  label: Still
  kind: action
  params: []

- id: step
  label: Step
  kind: action
  params: []

- id: continue
  label: Continue
  kind: action
  params: []

- id: jog
  label: Jog
  kind: action
  params:
    - name: frames
      type: integer
      description: Frame count (+128/-128 for 1-byte, +2592000/-2592000 for 4-byte signed)

- id: vari_play
  label: Variable Play
  kind: action
  params:
    - name: speed
      type: integer
      description: 24-bit signed binary (000000h=still, 010000h=std fwd, FF0000h=std rev)

- id: unfreeze
  label: Unfreeze
  kind: action
  params: []

- id: ee_mode
  label: EE Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=EE OFF, 1=EE ON, 2=EE AUTO"

# Preset/Select Commands (2X)
- id: rename_id
  label: Rename ID
  kind: action
  params:
    - name: original_id
      type: string
      description: Original 8-character ID
    - name: new_id
      type: string
      description: New 8-character ID

- id: preset_standard_time
  label: Preset Standard Time
  kind: action
  params:
    - name: time_mode
      type: integer
      description: "00h=DF, 01h=non-drop, 02h=PAL"
    - name: time
      type: string
      description: BCD timecode (frames, seconds, minutes, hours)

- id: new_copy
  label: New Copy
  kind: action
  params:
    - name: original_id
      type: string
      description: Source 8-character ID
    - name: new_id
      type: string
      description: Destination 8-character ID
    - name: offset
      type: integer
      description: Start offset within original
    - name: duration
      type: integer
      description: Duration of new copy

- id: sort_mode
  label: Sort Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "0=alphabetical, 1=FIFO"

- id: close_port
  label: Close Port
  kind: action
  params:
    - name: port
      type: integer
      description: Port number (8-bit signed)

- id: select_port
  label: Select Port
  kind: action
  params:
    - name: port
      type: integer
      description: Port number (8-bit signed)

- id: record_init
  label: Record Init
  kind: action
  params:
    - name: id
      type: string
      description: 8-character ID
    - name: length
      type: string
      description: Duration in BCD (frames, seconds, minutes, hours)

- id: play_cue
  label: Play Cue
  kind: action
  params:
    - name: id
      type: string
      description: 8-character ID to cue
    - name: prepared_file_handle
      type: integer
      description: Optional prepared file handle

- id: cue_with_data
  label: Cue with Data
  kind: action
  params:
    - name: id
      type: string
      description: 8-character ID
    - name: start_position
      type: string
      description: BCD start position
    - name: duration
      type: string
      description: BCD duration

- id: delete_id
  label: Delete ID
  kind: action
  params:
    - name: id
      type: string
      description: 8-character ID to delete

- id: get_from_archive
  label: Get From Archive
  kind: action
  params:
    - name: id
      type: string
      description: 8-character ID
    - name: tape_id
      type: string
      description: Optional tape ID

- id: clear
  label: Clear
  kind: action
  params: []

- id: send_to_archive
  label: Send to Archive
  kind: action
  params:
    - name: id
      type: string
      description: 8-character ID
    - name: tape_id
      type: string
      description: Optional tape ID

- id: percent_to_signal_full
  label: Percent to Signal Full
  kind: action
  params:
    - name: percent
      type: integer
      description: Disk space threshold percentage (0-100)

- id: record_init_with_data
  label: Record Init with Data
  kind: action
  params:
    - name: id
      type: string
      description: 8-character ID
    - name: start_position
      type: string
      description: BCD start position
    - name: length
      type: string
      description: BCD duration

- id: select_logical_drive
  label: Select Logical Drive
  kind: action
  params:
    - name: drive_select
      type: integer
      description: Bit map for drive selection

- id: system_delete_id
  label: System Delete ID
  kind: action
  params:
    - name: id
      type: string
      description: 8-character ID

- id: preset
  label: Preset
  kind: action
  params: []

- id: video_compression_rate
  label: Video Compression Rate
  kind: action
  params:
    - name: rate
      type: integer
      description: 32-bit unsigned bits/sec

- id: audio_sample_rate
  label: Audio Sample Rate
  kind: action
  params:
    - name: rate
      type: integer
      description: Bit map specifying sample rate

- id: audio_compression_rate
  label: Audio Compression Rate
  kind: action
  params:
    - name: rate
      type: integer
      description: Bit map specifying compression rate

- id: audio_in_level
  label: Audio In Level
  kind: action
  params:
    - name: level
      type: integer
      description: 2-byte level value

- id: audio_out_level
  label: Audio Out Level
  kind: action
  params:
    - name: level
      type: integer
      description: 2-byte level value

- id: video_compression_params
  label: Video Compression Parameters
  kind: action
  params:
    - name: params
      type: integer
      description: 4-byte compression parameters

- id: select_output
  label: Select Output
  kind: action
  params:
    - name: mode
      type: integer
      description: "Bit map: D1(10h), YUV(08h), S-Video(04h), Composite(02h), OFF(01h)"

- id: select_input
  label: Select Input
  kind: action
  params:
    - name: mode
      type: integer
      description: "Bit map: D1(10h), YUV(08h), S-Video(04h), Composite(02h), OFF(01h)"

- id: record_mode
  label: Record Mode
  kind: action
  params:
    - name: mode
      type: integer
      description: "Bit map: Video(Bit0), Audio1(Bit1), Audio2(Bit2), etc."

- id: sc_adjust
  label: Subcarrier Adjust
  kind: action
  params:
    - name: phase
      type: integer
      description: 2-byte subcarrier phase value

- id: h_pos_adjust
  label: Horizontal Position Adjust
  kind: action
  params:
    - name: timing
      type: integer
      description: 2-byte H timing value

- id: disk_preroll
  label: Disk Preroll
  kind: action
  params:
    - name: frames
      type: integer
      description: Preroll frames
    - name: seconds
      type: integer
      description: Preroll seconds

- id: copy_file_to
  label: Copy File To
  kind: action
  params:
    - name: id
      type: string
      description: 8-character ID
    - name: source
      type: integer
      description: Source disk address
    - name: destination
      type: integer
      description: Destination disk address(es)

- id: delete_file_from
  label: Delete File From
  kind: action
  params:
    - name: id
      type: string
      description: 8-character ID
    - name: destination
      type: integer
      description: Destination disk address(es)

- id: abort_copy_file_to
  label: Abort Copy File To
  kind: action
  params:
    - name: id
      type: string
      description: 8-character ID
    - name: source
      type: integer
      description: Source disk address
    - name: destination
      type: integer
      description: Destination disk address(es)

- id: asi_pid_select
  label: ASI PID Select
  kind: action
  params:
    - name: pid
      type: integer
      description: 16-bit PID value (0-65535)

# Sense Request Commands (3X)
- id: open_port
  label: Open Port
  kind: action
  params:
    - name: port
      type: integer
      description: Port number (8-bit signed, SIP=-1 to -127, SOP=1 to 127)
    - name: security_mode
      type: integer
      description: "1=locked, 0=unlocked"

- id: next
  label: Next
  kind: action
  params: []

- id: last
  label: Last
  kind: action
  params: []

- id: port_status_request
  label: Port Status Request
  kind: action
  params:
    - name: bit_map
      type: integer
      description: Bit map specifying which status bytes to return

- id: position_request
  label: Position Request
  kind: action
  params:
    - name: time_type
      type: integer
      description: "0=time remaining, 1=SOM-based timecode, 2=zero-based offset"

- id: active_id_request
  label: Active ID Request
  kind: action
  params: []

- id: device_type_request
  label: Device Type Request
  kind: action
  params: []

- id: system_status_request
  label: System Status Request
  kind: action
  params:
    - name: bit_map
      type: integer
      description: Bit map specifying which status to return

- id: id_list
  label: ID List
  kind: action
  params: []

- id: id_size_request
  label: ID Size Request
  kind: action
  params:
    - name: id
      type: string
      description: 8-character ID name

- id: ids_added_to_arch
  label: List IDs Added to Archive
  kind: action
  params: []

- id: id_request
  label: ID Request
  kind: action
  params:
    - name: id
      type: string
      description: 8-character ID name
    - name: disk_handle
      type: integer
      description: Optional remote disk handle

- id: compression_settings_request
  label: Compression Settings Request
  kind: action
  params:
    - name: bit_map
      type: integer
      description: Bit map specifying which settings to return

- id: ids_added_list
  label: IDs Added List
  kind: action
  params: []

- id: ids_deleted_list
  label: IDs Deleted List
  kind: action
  params: []

- id: multi_port_status_request
  label: Multi Port Status Request
  kind: action
  params:
    - name: start_port
      type: integer
      description: Starting port number
    - name: count
      type: integer
      description: Number of ports

- id: asi_program_number_request
  label: ASI Program Number Request
  kind: action
  params: []

# Deferred/Timeline Commands (4X)
- id: deferred_command
  label: Deferred (Timeline) Command
  kind: action
  params:
    - name: time
      type: string
      description: BCD timecode (frame, sec, min, hour)
    - name: command
      type: string
      description: Embedded immediate command

# Macro Commands (5X)
- id: abort_macro
  label: Abort Macro
  kind: action
  params:
    - name: macro_number
      type: integer
      description: 2-byte macro number (0=all macros)

- id: active_macro_list
  label: Active Macro List
  kind: action
  params: []

- id: macro_status
  label: Macro Status
  kind: action
  params:
    - name: macro_number
      type: integer
      description: 2-byte macro number

- id: copy_file_macro
  label: Copy File Macro
  kind: action
  params:
    - name: macro_number
      type: integer
      description: 2-byte macro number
    - name: id
      type: string
      description: 8-character ID
    - name: source
      type: integer
      description: Source disk address
    - name: destination
      type: integer
      description: Destination disk address

- id: get_from_archive_macro
  label: Get From Archive Macro
  kind: action
  params:
    - name: macro_number
      type: integer
      description: 2-byte macro number
    - name: id
      type: string
      description: 8-character ID

- id: send_to_archive_macro
  label: Send to Archive Macro
  kind: action
  params:
    - name: macro_number
      type: integer
      description: 2-byte macro number
    - name: id
      type: string
      description: 8-character ID

- id: prepare_id_to_play
  label: Prepare ID To Play
  kind: action
  params:
    - name: macro_number
      type: integer
      description: 2-byte macro number
    - name: id
      type: string
      description: 8-character ID
    - name: file_handle
      type: integer
      description: Prepared file handle
    - name: start_position
      type: integer
      description: Optional start position (4 bytes)
    - name: duration
      type: integer
      description: Optional duration (4 bytes)

- id: close_id_from_play
  label: Close ID From Play
  kind: action
  params:
    - name: macro_number
      type: integer
      description: 2-byte macro number
    - name: id
      type: string
      description: 8-character ID
```

## Feedbacks
```yaml
# Responses from controlled device
- id: ack
  label: ACK
  type: binary
  values: ["04h"]
  description: Positive acknowledgment

- id: nak
  label: NAK
  type: binary
  values: ["05h"]
  description: Negative acknowledgment with error data

- id: port_status
  label: Port Status
  type: object
  description: Returns port state flags, hardware/media status, error status, settings, and video compression types

- id: position
  label: Position
  type: string
  description: Timecode or time remaining in BCD format

- id: active_id
  label: Active ID
  type: object
  description: Active status and 8-character ID

- id: device_type
  label: Device Type
  type: string
  description: 16-byte manufacturer ID and specifications

- id: system_status
  label: System Status
  type: object
  description: Storage time remaining, disk status, subsystem status, standard time

- id: id_list
  label: ID List
  type: object
  description: Remaining count and list of 8-character IDs

- id: id_size
  label: ID Size
  type: string
  description: Duration in BCD (frames, seconds, minutes, hours)

- id: id_request_response
  label: ID Request Response
  type: object
  description: ID status bit map including location, protection, archive status

- id: compression_settings
  label: Compression Settings
  type: object
  description: Video/audio compression parameters

- id: macro_status_response
  label: Macro Status Response
  type: object
  description: Macro state, completion code, command echo, ID echo

- id: open_port_response
  label: Open Port Response
  type: enum
  values: [0, 1]
  description: "0=denied, 1=granted"
```

## Variables
```yaml
# No discrete settable variables - all parameters are command arguments
# Status is retrieved via sense request commands
```

## Events
```yaml
# Unsolicited notifications from controlled device
- id: macro_complete
  label: Macro Complete Return
  type: object
  description: Generated by controlled device when macro completes or fails

- id: error_response
  label: Error Response
  type: object
  description: |
    NAK with error bits:
    - TIME OUT (bit 7)
    - FRAMING ERROR (bit 6)
    - OVERRUN ERROR (bit 5)
    - PARITY ERROR (bit 4)
    - CHECKSUM ERROR (bit 2)
    - UNDEFINED ERROR (bit 0)
```

## Macros
```yaml
# Macros are deferred command sequences numbered 1-65535
# Controlled device tracks macro commands and reports result on completion
# Macro numbers may be reused after ACK from controller
```

## Safety
```yaml
confirmation_required_for: []
interlocks:
  - id: frame_accuracy_requirement
    description: Frame accurate commands (PLAY, RECORD, EE MODE, FREEZE, UNFREEZE, STILL, CONTINUE, PRESET STANDARD TIME) received by end of field 1 execute at next frame; received ending in field 2 execute at frame after next (N+1)
  - id: response_timeout
    description: Controller must detect timeout (100 msec) and request status if no reply received
  - id: port_busy_handling
    description: Disk may assert busy bit when unable to accept type 0, 2, 3, or 4 commands; busy status does not affect type 1 (immediate) commands
  - id: preroll_requirement
    description: DISK PREROLL command allows controller to specify delay after PLAY/RECORD to maintain frame accuracy
# UNRESOLVED: no explicit safety warnings or interlock procedures stated in source
```

## Notes
VDCP is a master-slave protocol where the controller sends commands and the video disk responds. Message format: STX(02h) + ByteCount + CMD-1 + CMD-2 + [DATA...] + CHECKSUM. CMD-1 contains 4-bit command type (0=System, 1=Immediate, 2=Preset/Select, 3=Sense, 4=Deferred, 5=Macro, 8=Variable ID System, A=Variable ID Preset/Select, B=Variable ID Sense, D=Variable ID Macro, F=Archive) and 4-bit unit address. ACK (04h) or NAK (05h) returned for types 0, 1, 2; type 3 responses have MSB set in CMD-2 (e.g., response to 29h is A9h). Checksum is 2's complement of least significant byte of sum from first command byte to before checksum. Fixed 8-character IDs padded with 0x20; variable length IDs use length byte prefix. Commands should not exceed 100 bytes; ID list replies limited to 80 bytes of ID data.

<!-- UNRESOLVED: specific device models that implement this protocol are not named in source -->
<!-- UNRESOLVED: electrical specifications (voltage, current, power) not provided -->
<!-- UNRESOLVED: physical connection details beyond RS-422 pinout not specified -->

## Provenance

```yaml
source_domains:
  - imaginecommunications.com
source_urls:
  - https://imaginecommunications.com/content/uploads/2024/11/VDCP_Protocol_Guide_Revision_20_20230531.pdf
retrieved_at: 2026-04-30T04:46:15.174Z
last_checked_at: 2026-04-25T21:06:26.422Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-25T21:06:26.422Z
matched_actions: 76
action_count: 76
confidence: high
summary: "All 76 spec actions match semantically to source command definitions, transport parameters verified verbatim, comprehensive protocol coverage confirmed."
```

## Known Gaps

```yaml
[]
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0

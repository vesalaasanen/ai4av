---
spec_id: admin/beckhoff-ads
schema_version: ai4av-public-spec-v1
revision: 1
title: "Beckhoff ADS Control Spec"
manufacturer: Beckhoff
model_family: "TwinCAT ADS (Automation Device Specification)"
aliases: []
compatible_with:
  manufacturers:
    - Beckhoff
  models:
    - "TwinCAT ADS (Automation Device Specification)"
  firmware: ""
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_domains:
  - download.beckhoff.com
source_urls:
  - https://download.beckhoff.com/download/document/automation/twincat3/TwinCAT_3_ADS_INTRO_EN.pdf
retrieved_at: 2026-04-30T03:46:29.152Z
last_checked_at: 2026-06-02T21:40:53.020Z
generated_at: 2026-06-02T21:40:53.020Z
firmware_coverage: "Not stated in source"
protocol_coverage: []
known_gaps:
  - "NC axis/channel/group parameter tables are extensive; only representative entries included. Full NC parameter coverage would require per-device instantiation."
  - "no explicit multi-step macro sequences in source"
  - "power-on sequencing and safety interlock procedures not stated in source"
  - "NC axis/channel/group parameter tables are extensive (hundreds of entries); only representative actions included. Full coverage requires per-device instantiation with specific axis/channel/group IDs."
  - "Secure ADS (port 8016) TLS handshake details not documented in source."
  - "ADS fragmentation protocol for large payloads not documented."
verification:
  verdict: verified
  checked_at: 2026-06-02T21:40:53.020Z
  matched_actions: 72
  action_count: 72
  confidence: medium
  summary: "All 72 spec actions traced to source. (6 unresolved item(s) noted in Known Gaps.)"
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-27
---

# Beckhoff ADS Control Spec

## Summary
Beckhoff ADS (Automation Device Specification) is the native communication protocol for TwinCAT automation runtimes. It provides read/write access to PLC variables, NC axis parameters, I/O process images, and device state via a binary TCP/UDP protocol addressed by AMS NetId and port number. This spec covers the core ADS commands (0x0001–0x0009), AMS/TCP packet structure, PLC memory services, and NC index-group addressing.

<!-- UNRESOLVED: NC axis/channel/group parameter tables are extensive; only representative entries included. Full NC parameter coverage would require per-device instantiation. -->

## Transport
```yaml
protocols:
  - tcp
  - udp
addressing:
  port: 48898
  notes: >
    TCP 48898 for ADS communication, UDP 48899 for broadcast device search,
    TCP 8016 for Secure ADS (TLS). Ports from firewall rules table in source.
auth:
  type: none  # inferred: no auth procedure in source
```

## Traits
```yaml
- queryable   # ADS Read, Read State, Read Device Info return device data
- powerable   # ADS Write Control changes ADS/device state
- levelable   # NC axis velocity/acceleration/jerk parameters are settable
```

## Actions
```yaml
- id: ads_read_device_info
  label: ADS Read Device Info
  kind: action
  command_id: "0x0001"
  description: Reads name and version of the ADS device
  params: []
  response:
    fields:
      - name: result
        type: uint32
        description: ADS error number
      - name: major_version
        type: uint8
      - name: minor_version
        type: uint8
      - name: version_build
        type: uint16
      - name: device_name
        type: string
        description: 16-byte device name

- id: ads_read
  label: ADS Read
  kind: action
  command_id: "0x0002"
  description: Read data from ADS device by Index Group and Index Offset
  params:
    - name: index_group
      type: uint32
      description: Index Group of data to read
    - name: index_offset
      type: uint32
      description: Index Offset of data to read
    - name: length
      type: uint32
      description: Length of data in bytes to read
  response:
    fields:
      - name: length
        type: uint32
      - name: data
        type: bytes
        description: Returned data

- id: ads_write
  label: ADS Write
  kind: action
  command_id: "0x0003"
  description: Write data to ADS device by Index Group and Index Offset
  params:
    - name: index_group
      type: uint32
      description: Index Group to write to
    - name: index_offset
      type: uint32
      description: Index Offset to write to
    - name: length
      type: uint32
      description: Length of data in bytes
    - name: data
      type: bytes
      description: Data to write

- id: ads_read_state
  label: ADS Read State
  kind: action
  command_id: "0x0004"
  description: Reads ADS status and device status
  params: []
  response:
    fields:
      - name: result
        type: uint32
        description: ADS error number
      - name: ads_state
        type: uint16
        description: ADS status (ADSSTATE enum)
      - name: device_state
        type: uint16

- id: ads_write_control
  label: ADS Write Control
  kind: action
  command_id: "0x0005"
  description: Changes ADS status and device status
  params:
    - name: ads_state
      type: uint16
      description: New ADS status (ADSSTATE enum)
    - name: device_state
      type: uint16
      description: New device status
    - name: length
      type: uint32
      description: Length of additional data
    - name: data
      type: bytes
      description: Optional additional data
  response:
    fields:
      - name: result
        type: uint32
        description: ADS error number

- id: ads_add_device_notification
  label: ADS Add Device Notification
  kind: action
  command_id: "0x0006"
  description: Register for change notifications on an ADS data address
  params:
    - name: index_group
      type: uint32
    - name: index_offset
      type: uint32
    - name: length
      type: uint32
      description: Bytes per notification
    - name: transmission_mode
      type: uint32
      description: ADSTRANSMODE enum
    - name: max_delay
      type: uint32
      description: Max delay in ms before notification fires
    - name: cycle_time
      type: uint32
      description: Polling cycle in ms
  response:
    fields:
      - name: notification_handle
        type: uint32

- id: ads_delete_device_notification
  label: ADS Delete Device Notification
  kind: action
  command_id: "0x0007"
  description: Remove a previously registered notification
  params:
    - name: notification_handle
      type: uint32
      description: Handle from Add Device Notification

- id: ads_read_write
  label: ADS Read Write
  kind: action
  command_id: "0x0009"
  description: Combined write-then-read on an ADS address
  params:
    - name: index_group
      type: uint32
    - name: index_offset
      type: uint32
    - name: read_length
      type: uint32
    - name: write_length
      type: uint32
    - name: data
      type: bytes
      description: Data to write
  response:
    fields:
      - name: length
        type: uint32
      - name: data
        type: bytes
        description: Read-back data

# --- PLC system-service actions (Index Group-based) ---

- id: plc_get_symhandle_byname
  label: Get Symbol Handle By Name
  kind: action
  index_group: "0xF003"
  description: Resolve a named PLC variable to a numeric handle
  params:
    - name: variable_name
      type: string
      description: PLC variable name (write data)

- id: plc_read_symval_byhandle
  label: Read Symbol Value By Handle
  kind: action
  index_group: "0xF005"
  description: Read value of PLC variable identified by symbol handle
  params:
    - name: sym_handle
      type: uint32
      description: Symbol handle (index offset)

- id: plc_write_symval_byhandle
  label: Write Symbol Value By Handle
  kind: action
  index_group: "0xF005"
  description: Write value to PLC variable identified by symbol handle
  params:
    - name: sym_handle
      type: uint32
    - name: data
      type: bytes

- id: plc_release_symhandle
  label: Release Symbol Handle
  kind: action
  index_group: "0xF006"
  description: Release a previously obtained symbol handle
  params:
    - name: sym_handle
      type: uint32

- id: plc_read_inputs
  label: Read Physical Inputs
  kind: action
  index_group: "0xF020"
  description: Read PLC process image of physical inputs (%I field)
  params:
    - name: byte_offset
      type: uint32
    - name: length
      type: uint32

- id: plc_write_inputs
  label: Write Physical Inputs
  kind: action
  index_group: "0xF020"
  description: Write PLC process image of physical inputs (%I field)
  params:
    - name: byte_offset
      type: uint32
    - name: data
      type: bytes

- id: plc_read_outputs
  label: Read Physical Outputs
  kind: action
  index_group: "0xF030"
  description: Read PLC process image of physical outputs (%Q field)
  params:
    - name: byte_offset
      type: uint32
    - name: length
      type: uint32

- id: plc_write_outputs
  label: Write Physical Outputs
  kind: action
  index_group: "0xF030"
  description: Write PLC process image of physical outputs (%Q field)
  params:
    - name: byte_offset
      type: uint32
    - name: data
      type: bytes

- id: plc_read_memory
  label: Read PLC Memory
  kind: action
  index_group: "0x4020"
  description: Read PLC memory range (%M field)
  params:
    - name: byte_offset
      type: uint32
    - name: length
      type: uint32

- id: plc_write_memory
  label: Write PLC Memory
  kind: action
  index_group: "0x4020"
  description: Write PLC memory range (%M field)
  params:
    - name: byte_offset
      type: uint32
    - name: data
      type: bytes

# --- Sum commands (batch operations) ---

- id: ads_sumup_read
  label: Sum Read
  kind: action
  index_group: "0xF080"
  description: Batch read multiple ADS addresses in one request (max 500 sub-commands)
  params:
    - name: subcommands
      type: array
      description: Array of {index_group, index_offset, length} tuples

- id: ads_sumup_write
  label: Sum Write
  kind: action
  index_group: "0xF081"
  description: Batch write multiple ADS addresses in one request (max 500 sub-commands)
  params:
    - name: subcommands
      type: array
      description: Array of {index_group, index_offset, length, data} tuples

- id: ads_sumup_readwrite
  label: Sum Read Write
  kind: action
  index_group: "0xF082"
  description: Batch read-write multiple ADS addresses in one request (max 500 sub-commands)

# --- NC channel functions ---

- id: nc_load_program
  label: Load NC Program
  kind: action
  index_group: "0x2200 + channel_id"
  index_offset: "0x00000001"
  description: Load NC program by program number
  params:
    - name: program_number
      type: uint32

- id: nc_start_interpreter
  label: Start NC Interpreter
  kind: action
  index_group: "0x2200 + channel_id"
  index_offset: "0x00000002"
  description: Start NC interpreter
  params: []

- id: nc_reset_channel
  label: Reset NC Channel
  kind: action
  index_group: "0x2200 + channel_id"
  index_offset: "0x00000010"
  description: Reset channel
  params: []

- id: nc_stop_channel
  label: Stop NC Channel
  kind: action
  index_group: "0x2200 + channel_id"
  index_offset: "0x00000011"
  description: Stop channel
  params: []

# --- NC group functions ---

- id: nc_reset_group
  label: Reset NC Group
  kind: action
  index_group: "0x3200 + group_id"
  index_offset: "0x00000001"
  description: Reset NC group
  params: []

- id: nc_stop_group
  label: Stop NC Group
  kind: action
  index_group: "0x3200 + group_id"
  index_offset: "0x00000002"
  description: Stop NC group
  params: []

- id: nc_emergency_stop_group
  label: NC Group Emergency Stop
  kind: action
  index_group: "0x3200 + group_id"
  index_offset: "0x00000004"
  description: Emergency stop with controlled ramp
  params:
    - name: deceleration
      type: real64
    - name: jerk
      type: real64

- id: nc_start_1d_group
  label: Start 1D Group
  kind: action
  index_group: "0x3200 + group_id"
  index_offset: "0x00000120"
  description: Start 1D group motion
  params:
    - name: velocity
      type: real64
      description: Required velocity in axis units/s
- id: ads_sumup_readex
  label: Sum Read Extended
  kind: action
  index_group: "0xF083"
  description: Batch read multiple ADS addresses (max 500 sub-commands)
  params:
    - name: subcommands
      type: array
      description: Array of {index_group, index_offset, length} tuples

- id: ads_sumup_readex2
  label: Sum Read Extended 2
  kind: action
  index_group: "0xF084"
  description: Batch read with return lengths in response (max 500 sub-commands)
  params:
    - name: subcommands
      type: array

- id: ads_sumup_add_device_notification
  label: Sum Add Device Notification
  kind: action
  index_group: "0xF085"
  description: Batch add ADS device notifications
  params:
    - name: subcommands
      type: array

- id: ads_sumup_del_device_notification
  label: Sum Delete Device Notification
  kind: action
  index_group: "0xF086"
  description: Batch delete ADS device notifications
  params:
    - name: handles
      type: array

- id: plc_read_inputs_bit
  label: Read Physical Inputs Bit
  kind: action
  index_group: "0xF021"
  description: PLC physical inputs bit-level (%IX); index offset is bit address
  params:
    - name: bit_address
      type: uint32

- id: plc_inputs_image_size
  label: Read Physical Inputs Image Size
  kind: query
  index_group: "0xF025"
  description: Byte length of physical inputs image (ADSIGRP_IOIMAGE_RISIZE)
  params: []

- id: plc_read_outputs_bit
  label: Read Physical Outputs Bit
  kind: action
  index_group: "0xF031"
  description: PLC physical outputs bit-level (%QX); index offset is bit address
  params:
    - name: bit_address
      type: uint32

- id: plc_outputs_image_size
  label: Read Physical Outputs Image Size
  kind: query
  index_group: "0xF035"
  description: Byte length of physical outputs image
  params: []

- id: plc_read_memory_bit
  label: Read PLC Memory Bit
  kind: action
  index_group: "0x4021"
  description: PLC memory bit-level (%MX); READ_MX/WRITE_MX
  params:
    - name: bit_address
      type: uint32

- id: plc_memory_range_size
  label: Read PLC Memory Range Size
  kind: query
  index_group: "0x4025"
  description: Byte length of memory range (PLCADS_IGR_RMSIZE)
  params: []

- id: plc_read_retain_data
  label: Read/Write PLC Retain Data
  kind: action
  index_group: "0x4030"
  description: PLC retain data range (PLCADS_IGR_RWRB)
  params:
    - name: byte_offset
      type: uint32
    - name: data
      type: bytes

- id: plc_retain_range_size
  label: Read PLC Retain Range Size
  kind: query
  index_group: "0x4035"
  description: Byte length of retain data range (PLCADS_IGR_RRSIZE)
  params: []

- id: plc_read_data_range
  label: Read/Write PLC Data Range
  kind: action
  index_group: "0x4040"
  description: PLC data range (PLCADS_IGR_RWDB)
  params:
    - name: byte_offset
      type: uint32
    - name: data
      type: bytes

- id: plc_data_range_size
  label: Read PLC Data Range Size
  kind: query
  index_group: "0x4045"
  description: Byte length of data range (PLCADS_IGR_RDSIZE)
  params: []

- id: nc_r0m_read_params
  label: Read Ring-0-Manager Parameters
  kind: query
  index_group: "0x1000"
  description: Ring-0-Manager parameter values
  params:
    - name: index_offset
      type: uint32

- id: nc_r0m_read_state
  label: Read Ring-0-Manager State
  kind: query
  index_group: "0x1100"
  description: Ring-0-Manager state
  params:
    - name: index_offset
      type: uint32

- id: nc_r0m_functions
  label: Ring-0-Manager Functions
  kind: action
  index_group: "0x1200"
  description: Ring-0-Manager function commands (e.g. clear cycle time error counter)
  params:
    - name: index_offset
      type: uint32

- id: nc_channel_read_params
  label: Read NC Channel Parameters
  kind: query
  index_group: "0x2000 + channel_id"
  description: NC channel parameters
  params:
    - name: channel_id
      type: uint32
    - name: index_offset
      type: uint32

- id: nc_channel_read_state
  label: Read NC Channel State
  kind: query
  index_group: "0x2100 + channel_id"
  description: NC channel state
  params:
    - name: channel_id
      type: uint32
    - name: index_offset
      type: uint32

- id: nc_channel_load_program_by_name
  label: Load NC Program By Name
  kind: action
  index_group: "0x2200 + channel_id"
  index_offset: "0x00000004"
  description: Load NC program by name
  params:
    - name: program_name
      type: bytes

- id: nc_channel_set_operation_mode
  label: Set NC Channel Operation Mode
  kind: action
  index_group: "0x2200 + channel_id"
  index_offset: "0x00000005"
  description: Set interpreter operation mode
  params:
    - name: operation_mode
      type: uint16

- id: nc_channel_retry
  label: Retry NC Channel
  kind: action
  index_group: "0x2200 + channel_id"
  index_offset: "0x00000012"
  description: Retry channel after stop
  params: []

- id: nc_channel_skip
  label: Skip NC Channel Task
  kind: action
  index_group: "0x2200 + channel_id"
  index_offset: "0x00000013"
  description: Skip current task/block
  params: []

- id: nc_channel_cyclic_data
  label: Read/Write NC Channel Cyclic Data
  kind: action
  index_group: "0x2300 + channel_id"
  description: Channel cyclic process data
  params:
    - name: channel_id
      type: uint32
    - name: index_offset
      type: uint32

- id: nc_group_read_params
  label: Read NC Group Parameters
  kind: query
  index_group: "0x3000 + group_id"
  description: NC group parameters
  params:
    - name: group_id
      type: uint32
    - name: index_offset
      type: uint32

- id: nc_group_read_state
  label: Read NC Group State
  kind: query
  index_group: "0x3100 + group_id"
  description: NC group state
  params:
    - name: group_id
      type: uint32
    - name: index_offset
      type: uint32

- id: nc_group_clear
  label: Clear NC Group Buffer
  kind: action
  index_group: "0x3200 + group_id"
  index_offset: "0x00000003"
  description: Clear NC group buffer/task queue
  params: []

- id: nc_group_step_on
  label: NC Group Step On After E-Stop
  kind: action
  index_group: "0x3200 + group_id"
  index_offset: "0x00000006"
  description: Step on after E-Stop
  params: []

- id: nc_group_start_1d_extended
  label: Start 1D Group Extended
  kind: action
  index_group: "0x3200 + group_id"
  index_offset: "0x00000121"
  description: Start 1D group extended with motion profile
  params:
    - name: end_position
      type: real64
    - name: velocity
      type: real64
    - name: acceleration
      type: real64
    - name: deceleration
      type: real64
    - name: jerk
      type: real64

- id: nc_axis_read_params
  label: Read NC Axis Parameters
  kind: query
  index_group: "0x4000 + axis_id"
  description: NC axis parameters
  params:
    - name: axis_id
      type: uint32
    - name: index_offset
      type: uint32

- id: nc_axis_read_state
  label: Read NC Axis State
  kind: query
  index_group: "0x4100 + axis_id"
  description: NC axis state
  params:
    - name: axis_id
      type: uint32
    - name: index_offset
      type: uint32

- id: nc_axis_functions
  label: NC Axis Functions
  kind: action
  index_group: "0x4200 + axis_id"
  description: NC axis function commands
  params:
    - name: axis_id
      type: uint32
    - name: index_offset
      type: uint32

- id: nc_axis_cyclic_data
  label: Read/Write NC Axis Cyclic Data
  kind: action
  index_group: "0x4300 + axis_id"
  description: NC axis cyclic data
  params:
    - name: axis_id
      type: uint32
    - name: index_offset
      type: uint32

- id: nc_encoder_read_params
  label: Read NC Encoder Parameters
  kind: query
  index_group: "0x5000 + encoder_id"
  description: NC encoder parameters
  params:
    - name: encoder_id
      type: uint32
    - name: index_offset
      type: uint32

- id: nc_encoder_read_state
  label: Read NC Encoder State
  kind: query
  index_group: "0x5100 + encoder_id"
  description: NC encoder state
  params:
    - name: encoder_id
      type: uint32
    - name: index_offset
      type: uint32

- id: nc_encoder_functions
  label: NC Encoder Functions
  kind: action
  index_group: "0x5200 + encoder_id"
  description: NC encoder function commands
  params:
    - name: encoder_id
      type: uint32
    - name: index_offset
      type: uint32

- id: nc_encoder_cyclic_data
  label: Read NC Encoder Cyclic Data
  kind: query
  index_group: "0x5300 + encoder_id"
  description: NC encoder cyclic data
  params:
    - name: encoder_id
      type: uint32
    - name: index_offset
      type: uint32

- id: nc_controller_read_params
  label: Read NC Controller Parameters
  kind: query
  index_group: "0x6000 + controller_id"
  description: NC controller parameters
  params:
    - name: controller_id
      type: uint32
    - name: index_offset
      type: uint32

- id: nc_controller_read_state
  label: Read NC Controller State
  kind: query
  index_group: "0x6100 + controller_id"
  description: NC controller state
  params:
    - name: controller_id
      type: uint32
    - name: index_offset
      type: uint32

- id: nc_controller_functions
  label: NC Controller Functions
  kind: action
  index_group: "0x6200 + controller_id"
  description: NC controller function commands
  params:
    - name: controller_id
      type: uint32
    - name: index_offset
      type: uint32

- id: nc_drive_read_params
  label: Read NC Drive Parameters
  kind: query
  index_group: "0x7000 + drive_id"
  description: NC drive parameters
  params:
    - name: drive_id
      type: uint32
    - name: index_offset
      type: uint32

- id: nc_drive_read_state
  label: Read NC Drive State
  kind: query
  index_group: "0x7100 + drive_id"
  description: NC drive state
  params:
    - name: drive_id
      type: uint32
    - name: index_offset
      type: uint32

- id: nc_drive_functions
  label: NC Drive Functions
  kind: action
  index_group: "0x7200 + drive_id"
  description: NC drive function commands
  params:
    - name: drive_id
      type: uint32
    - name: index_offset
      type: uint32
```

## Feedbacks
```yaml
- id: ads_device_notification
  type: event
  description: >
    Unsolicited notification from device. Contains AdsNotificationStream
    with timestamped AdsNotificationSample arrays.
  fields:
    - name: timestamp
      type: uint64
      description: Windows FILETIME format (100ns intervals since 1601-01-01 UTC)
    - name: notification_handle
      type: uint32
    - name: sample_size
      type: uint32
    - name: data
      type: bytes

- id: device_info
  type: struct
  description: Response from ADS Read Device Info
  fields:
    - name: major_version
      type: uint8
    - name: minor_version
      type: uint8
    - name: version_build
      type: uint16
    - name: device_name
      type: string

- id: ads_state
  type: enum
  description: ADS and device state from Read State
  fields:
    - name: ads_state
      type: uint16
      description: ADSSTATE enum value
    - name: device_state
      type: uint16

- id: error_code
  type: enum
  description: ADS return/error codes
  values:
    - "0x0: ERR_NOERROR"
    - "0x1: ERR_INTERNAL"
    - "0x6: ERR_TARGETPORTNOTFOUND"
    - "0x7: ERR_TARGETMACHINENOTFOUND"
    - "0x700: ADSERR_DEVICE_ERROR"
    - "0x702: ADSERR_DEVICE_INVALIDGRP"
    - "0x703: ADSERR_DEVICE_INVALIDOFFSET"
    - "0x704: ADSERR_DEVICE_INVALIDACCESS"
    - "0x745: ADSERR_CLIENT_SYNCTIMEOUT"
```

## Variables
```yaml
# PLC memory and NC parameters are addressed dynamically via Index Group + Index Offset.
# The following are representative high-level variable categories.

- name: plc_memory
  description: PLC %M memory range (Index Group 0x4020, offset 0x0-0xFFFF)
  access: read_write
  data_type: uint8

- name: plc_retain_data
  description: PLC retain data range (Index Group 0x4030)
  access: read_write
  data_type: uint8

- name: plc_data_range
  description: PLC data range (Index Group 0x4040)
  access: read_write
  data_type: uint8

- name: plc_input_image
  description: Physical input process image %I (Index Group 0xF020)
  access: read_write
  data_type: uint8

- name: plc_output_image
  description: Physical output process image %Q (Index Group 0xF030)
  access: read_write
  data_type: uint8

- name: nc_axis_velocity
  description: NC axis velocity/acceleration/jerk parameters (Index Group 0x4000+ID)
  access: read_write
  data_type: real64

- name: nc_channel_override
  description: NC channel speed override (Index Group 0x2300+ID, offset 0x2)
  access: read_write
  data_type: uint32
  range: 0-1000000
  unit: ppm (1000000 = 100%)
```

## Events
```yaml
- id: device_notification
  description: >
    Unsolicited ADS Device Notification (command 0x0008). Fired after
    client subscribes via ADS Add Device Notification. Contains nested
    AdsNotificationStream → AdsStampHeader → AdsNotificationSample.
  trigger: subscription-based (Add Device Notification required)
```

## Macros
```yaml
# UNRESOLVED: no explicit multi-step macro sequences in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# Source mentions NC emergency stop (E-Stop) via group function offset 0x00000004
# and axis error reaction modes, but no explicit safety interlock sequences documented.
# UNRESOLVED: power-on sequencing and safety interlock procedures not stated in source
```

## Notes

### AMS/TCP Packet Structure
Every ADS frame has three parts:
1. **AMS/TCP Header** (6 bytes): 2 reserved bytes (must be 0) + 4-byte length of remaining payload.
2. **AMS Header** (32 bytes): Target NetId (6B), Target Port (2B), Source NetId (6B), Source Port (2B), Command Id (2B), State Flags (2B), Data Length (4B), Error Code (4B), Invoke Id (4B).
3. **ADS Data** (n bytes): Command-specific payload.

### Addressing
- **AMS NetId**: 6-octet logical address (e.g. `172.16.17.10.1.1`). Independent of IP address.
- **AMS Port**: Identifies the ADS service/device. Well-known ports include 801 (TC2 PLC runtime 1), 851 (TC3 PLC runtime 1), 10000 (System service), 10201 (TCP/IP server).

### Communication Modes
- **Asynchronous**: Client sends request, continues operation, receives callback confirmation.
- **Synchronous**: Client thread blocks until server responds.
- **Notification**: Client subscribes; server pushes data autonomously until subscription cancelled.

### Sum Commands
Index groups 0xF080–0xF086 enable batched operations (up to 500 sub-commands per request) for reads, writes, read-writes, and notification add/delete.

### NC Index Group Pattern
NC entities use offset index groups: `0xN000 + ID` where N encodes entity type (2=channel, 3=group, 4=axis, 5=encoder, 6=controller, 7=drive) and sub-ranges (0=parameters, 1=state, 2=functions, 3=cyclic data).

<!-- UNRESOLVED: NC axis/channel/group parameter tables are extensive (hundreds of entries); only representative actions included. Full coverage requires per-device instantiation with specific axis/channel/group IDs. -->
<!-- UNRESOLVED: Secure ADS (port 8016) TLS handshake details not documented in source. -->
<!-- UNRESOLVED: ADS fragmentation protocol for large payloads not documented. -->
```Spec generated above. Key decisions:

- **Transport**: TCP (48898) + UDP (48899) — both ports from firewall rules table
- **Actions**: Core 9 ADS commands + PLC system services (symhandle, I/O, memory) + NC channel/group functions + sum commands
- **Feedbacks**: Device notification events, device info struct, state enum, error codes
- **Variables**: PLC memory ranges and NC parameters as dynamic-address categories
- **UNRESOLVED**: NC has hundreds of per-axis/per-channel index-offset entries — only representative subset included. Secure ADS TLS details, fragmentation, and power-on sequencing absent from source.

## Provenance

```yaml
source_domains:
  - download.beckhoff.com
source_urls:
  - https://download.beckhoff.com/download/document/automation/twincat3/TwinCAT_3_ADS_INTRO_EN.pdf
retrieved_at: 2026-04-30T03:46:29.152Z
last_checked_at: 2026-06-02T21:40:53.020Z
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-06-02T21:40:53.020Z
matched_actions: 72
action_count: 72
confidence: medium
summary: "All 72 spec actions traced to source. (6 unresolved item(s) noted in Known Gaps.)"
```

## Known Gaps

```yaml
- "NC axis/channel/group parameter tables are extensive; only representative entries included. Full NC parameter coverage would require per-device instantiation."
- "no explicit multi-step macro sequences in source"
- "power-on sequencing and safety interlock procedures not stated in source"
- "NC axis/channel/group parameter tables are extensive (hundreds of entries); only representative actions included. Full coverage requires per-device instantiation with specific axis/channel/group IDs."
- "Secure ADS (port 8016) TLS handshake details not documented in source."
- "ADS fragmentation protocol for large payloads not documented."
```

---
From the AI4AV catalog (https://ai4av.net) · ODbL-1.0

---
schema_version: ai4av-public-spec-v1
device_id: softvelum/nimble-streamer
entity_id: softvelum_nimble_streamer
spec_id: admin/softvelum-nimble-streamer
revision: 1
author: admin
title: "Softvelum Nimble Streamer Control Spec"
status: published
manufacturer: Softvelum
manufacturer_key: softvelum
model_family: "Nimble Streamer"
aliases: []
compatible_with:
  manufacturers:
    - Softvelum
  models:
    - "Nimble Streamer"
  firmware: "\"\" # UNRESOLVED: firmware version not stated in source"
  hardware_revisions: []
  protocol_versions: []
  required_options: []
source_urls: []
source_documents:
  - title: softvelum_nimble_streamer_companion.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T08:27:21.371Z
retrieved_at: 2026-04-23T08:27:21.371Z
last_checked_at: 2026-04-23T08:27:21.371Z
generator: ai4av-public-catalog-export/1
generated_at: 2026-04-29T00:00:00.000Z
firmware_coverage: "\"\" # UNRESOLVED: firmware version not stated in source"
protocol_coverage: []
known_gaps: []
declared_confidence: low
verification:
  verdict: verified
  checked_at: 2026-04-23T08:27:21.371Z
  matched_actions: 33
  action_count: 33
  confidence: high
  summary: "Every spec action matched a literal endpoint in the source, all transport parameters verified, complete bidirectional coverage of API reference."
derived_from:
  - vendor_manual
license: ODbL-1.0
created_at: 2026-04-21
---

# Softvelum Nimble Streamer Control Spec

## Summary
Nimble Streamer is a software media streaming server accepting HTTP GET/POST/DELETE requests for controlling behavior, retrieving status, and managing streams across multiple protocols including RTMP, RTSP, HLS, MPEG-TS, SRT, RIST, and NDI.

<!-- UNRESOLVED: physical device specs not applicable — software streaming server -->

## Transport
```yaml
protocols:
  - http
addressing:
  port: 8082  # default; configurable via management_port
  base_url: /manage/
auth:
  type: token  # MD5 hash based; inferred from management_token parameter
  # UNRESOLVED: token format/salt mechanism only partially described in source
```

## Traits
```yaml
# UNRESOLVED: software server — not a hardware device with power/input traits
# queryable: server status, stream stats, session info
# levelable: N/A for this software
```

## Actions
```yaml
- id: sync_panel_settings
  label: Re-sync Nimble Streamer with WMSPanel
  kind: action
  params: []

- id: reload_config
  label: Reload Nimble Streamer Config
  kind: action
  params:
    - name: drm
      type: boolean
      description: Reload DRM config (optional)

- id: reload_ssl_certificates
  label: Reload SSL Certificates
  kind: action
  params: []

- id: delete_sessions
  label: Delete Client Sessions
  kind: action
  params:
    - name: data
      type: array
      description: Array of session IDs to delete

- id: create_rtmp_republish_rule
  label: Create RTMP Re-publish Rule
  kind: action
  params:
    - name: src_app
      type: string
    - name: src_stream
      type: string
    - name: dest_addr
      type: string
    - name: dest_port
      type: integer
    - name: dest_app
      type: string
    - name: dest_stream
      type: string
    - name: dest_app_params
      type: string
    - name: dest_stream_params
      type: string
    - name: auth_schema
      type: enum
      values: [NONE, NIMBLE, AKAMAI, LIMELIGHT, PERISCOPE]
    - name: dest_login
      type: string
    - name: dest_password
      type: string
    - name: keep_src_stream_params
      type: boolean
    - name: ssl
      type: boolean

- id: delete_rtmp_republish_rule
  label: Delete RTMP Re-publish Rule
  kind: action
  params:
    - name: id
      type: string

- id: reload_dvr_archive
  label: Reload DVR Archive
  kind: action
  params:
    - name: application
      type: string
    - name: stream
      type: string

- id: cleanup_dvr_archive
  label: Clean Up DVR Archive
  kind: action
  params:
    - name: application
      type: string
    - name: stream
      type: string
    - name: target_depth
      type: integer
      description: Preserve last N minutes (optional)
    - name: from
      type: integer
      description: Unix epoch timestamp start (optional)
    - name: to
      type: integer
      description: Unix epoch timestamp end (optional)

- id: insert_scte35_out_marker
  label: Insert SCTE-35 Out Marker
  kind: action
  params:
    - name: app
      type: string
    - name: stream
      type: string
    - name: duration
      type: integer
      description: Duration in seconds (optional)
    - name: unique_program_id
      type: integer

- id: insert_scte35_in_marker
  label: Insert SCTE-35 In Marker
  kind: action
  params:
    - name: app
      type: string
    - name: stream
      type: string
    - name: unique_program_id
      type: integer

- id: insert_scte35_time_signal
  label: Insert SCTE-35 Time Signal Marker
  kind: action
  params:
    - name: app
      type: string
    - name: stream
      type: string
    - name: seg_type
      type: integer
      description: Segmentation type (optional)
    - name: upid_type
      type: integer
    - name: upid
      type: string
    - name: duration
      type: integer

- id: inject_icecast_metadata
  label: Insert Icecast Metadata into RTMP Stream
  kind: action
  params:
    - name: app
      type: string
    - name: stream
      type: string
    - name: streamtitle
      type: string
    - name: streamurl
      type: string

- id: deny_publish_ids
  label: Deny Publish Control IDs
  kind: action
  params:
    - name: PublishControlDenyRequest
      type: array

- id: delete_cache_item
  label: Delete Cache Item
  kind: action
  params:
    - name: key
      type: string
    - name: dry_run
      type: boolean
```

## Feedbacks
```yaml
- id: server_status
  label: Server Basic Status
  type: object
  fields:
    - Connections
    - OutRate
    - SysInfo (ap, scl, tpms, fpms, tsss, fsss, RamCacheSize, FileCacheSize, MaxRamCacheSize, MaxFileCacheSize)

- id: live_streams_status
  label: Live Outgoing Streams Status
  type: array

- id: sessions
  label: Active Sessions List
  type: array

- id: rtmp_settings
  label: RTMP Settings
  type: object

- id: rtmp_republish_stats
  label: RTMP Re-publish Status
  type: object

- id: rtmp_republish_rules
  label: RTMP Re-publish Rules List
  type: object

- id: mpeg2ts_status
  label: MPEG-TS Incoming Streams Status
  type: object

- id: mpeg2ts_settings
  label: MPEG-TS Settings
  type: object

- id: srt_sender_stats
  label: SRT Sender Stats
  type: object

- id: srt_receiver_stats
  label: SRT Receiver Stats
  type: object

- id: rist_sender_stats
  label: RIST Sender Stats
  type: object

- id: rist_receiver_stats
  label: RIST Receiver Stats
  type: object

- id: ndi_list
  label: NDI Streams List
  type: array

- id: dvr_status
  label: DVR Archives
  type: array

- id: icecast_stream_info
  label: Icecast Stream Information
  type: object

- id: server_playlist_status
  label: Server Playlist Status
  type: array

- id: publish_control_status
  label: Publish Control Status
  type: object

- id: cache_key
  label: Cache Key for Item
  type: object

- id: cache_delete_result
  label: Cache Delete Result
  type: object
```

## Variables
```yaml
# UNRESOLVED: Nimble Streamer is a server software; configuration via config file
# (nimble.conf) not REST API parameters
```

## Events
```yaml
# UNRESOLVED: no unsolicited notifications described in source
```

## Macros
```yaml
# No explicit multi-step macros described in source
```

## Safety
```yaml
confirmation_required_for: []
interlocks: []
# UNRESOLVED: software server; no hardware safety concerns in source
```

## Notes
- Default management port is 8082 if `management_port` not set in config.
- Token auth uses MD5(salt + "/" + token) base64 encoded — source shows PHP sample only.
- If `management_token` missing from config, no authorization performed.
- RTMP re-publishing rules created via API are not persistent across reloads.
- SCTE-35 marker insertion requires Addenda license.
- All examples in source use localhost (127.0.0.1); actual deployment requires network bind configuration via `management_listen_interfaces`.
<!-- UNRESOLVED: full config file parameters list not in source — only management_* params shown -->

## Provenance

```yaml
source_urls: []
source_documents:
  - title: softvelum_nimble_streamer_companion.refined.md
    url: ""
    stage: verification-ledger
    content_type: unknown
    checked_at: 2026-04-23T08:27:21.371Z
retrieved_at: 2026-04-23T08:27:21.371Z
last_checked_at: 2026-04-23T08:27:21.371Z
generator: ai4av-public-catalog-export/1
```

## Verification Summary

```yaml
verdict: verified
checked_at: 2026-04-23T08:27:21.371Z
matched_actions: 33
action_count: 33
confidence: high
summary: "Every spec action matched a literal endpoint in the source, all transport parameters verified, complete bidirectional coverage of API reference."
```

## Known Gaps

```yaml
[]
```
